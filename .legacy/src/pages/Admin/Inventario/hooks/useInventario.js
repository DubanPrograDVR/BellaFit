import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getPacks,
  createPack,
  updatePack,
  deletePack,
  uploadProductImage,
} from "../../../../lib/admin";
import { supabase } from "../../../../lib/supabase";
import { useToast } from "../../../../context/ToastContext";

const CATEGORIAS = [
  "equipo",
  "ropa",
  "accesorios",
  "suplementos",
  "botellas",
  "giftcards",
];

const BADGES = ["NUEVO", "OFERTA", "BESTSELLER"];

const emptyProductForm = {
  nombre: "",
  descripcion: "",
  categoria: "equipo",
  precio: "",
  precio_anterior: "",
  stock: "",
  stock_minimo: "5",
  badge: "",
  imagen_url: "",
};

const emptyPackForm = {
  nombre: "",
  descripcion: "",
  precio: "",
  imagen_url: "",
  items: [],
};

export function useInventario() {
  const [products, setProducts] = useState([]);
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("productos"); // productos | packs | alertas
  const [search, setSearch] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("todos");

  // Product forms
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [createProductForm, setCreateProductForm] = useState(emptyProductForm);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editProductForm, setEditProductForm] = useState({});
  const [confirmDeleteProductId, setConfirmDeleteProductId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Pack forms
  const [showCreatePack, setShowCreatePack] = useState(false);
  const [createPackForm, setCreatePackForm] = useState(emptyPackForm);
  const [editingPackId, setEditingPackId] = useState(null);
  const [editPackForm, setEditPackForm] = useState({});
  const [confirmDeletePackId, setConfirmDeletePackId] = useState(null);

  const { showToast } = useToast();

  // ── Initial load ──
  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      const [productsRes, packsRes] = await Promise.all([
        getProducts(),
        getPacks(),
      ]);

      if (ignore) return;

      if (productsRes.data) setProducts(productsRes.data);
      if (packsRes.data) setPacks(packsRes.data);
      setLoading(false);
    };

    void loadData();

    return () => {
      ignore = true;
    };
  }, []);

  // ── Realtime ──
  useEffect(() => {
    const channel = supabase
      .channel("admin-inventory-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setProducts((prev) => {
              if (prev.some((p) => p.id === payload.new.id)) return prev;
              return [payload.new, ...prev];
            });
          } else if (payload.eventType === "UPDATE") {
            setProducts((prev) =>
              prev.map((p) =>
                p.id === payload.new.id ? { ...p, ...payload.new } : p,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setProducts((prev) => prev.filter((p) => p.id !== payload.old.id));
          }
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "product_packs" },
        async (payload) => {
          if (payload.eventType === "DELETE") {
            setPacks((prev) => prev.filter((p) => p.id !== payload.old.id));
            return;
          }
          const { data } = await supabase
            .from("product_packs")
            .select(
              "*, pack_items(*, product:products(id, nombre, precio, imagen_url))",
            )
            .eq("id", payload.new.id)
            .single();

          if (!data) return;

          if (payload.eventType === "INSERT") {
            setPacks((prev) => {
              if (prev.some((p) => p.id === data.id)) return prev;
              return [data, ...prev];
            });
          } else if (payload.eventType === "UPDATE") {
            setPacks((prev) => prev.map((p) => (p.id === data.id ? data : p)));
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ── Filters ──
  const filteredProducts = products.filter((p) => {
    const matchSearch =
      !search || p.nombre?.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      filterCategoria === "todos" || p.categoria === filterCategoria;
    return matchSearch && matchCat;
  });

  const filteredPacks = packs.filter(
    (p) => !search || p.nombre?.toLowerCase().includes(search.toLowerCase()),
  );

  const lowStockProducts = products.filter(
    (p) => p.stock <= (p.stock_minimo ?? 5),
  );

  // ── Image upload ──
  const handleImageUpload = async (file, onSuccess) => {
    setUploadingImage(true);
    const { url, error } = await uploadProductImage(file);
    setUploadingImage(false);

    if (error || !url) {
      showToast("Error al subir imagen", "error");
      return;
    }

    onSuccess(url);
  };

  // ── Product CRUD ──
  const toggleCreateProduct = () => {
    if (showCreateProduct) {
      setCreateProductForm(emptyProductForm);
      setShowCreateProduct(false);
      return;
    }
    cancelEditProduct();
    setShowCreatePack(false);
    setShowCreateProduct(true);
  };

  const updateCreateProductField = (field, value) => {
    setCreateProductForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateProduct = async () => {
    const f = createProductForm;
    if (!f.nombre.trim() || !f.precio || !f.stock) {
      showToast("Completa nombre, precio y stock", "error");
      return;
    }

    const payload = {
      nombre: f.nombre.trim(),
      descripcion: f.descripcion.trim() || null,
      categoria: f.categoria,
      precio: parseFloat(f.precio),
      precio_anterior: f.precio_anterior ? parseFloat(f.precio_anterior) : null,
      stock: parseInt(f.stock, 10),
      stock_minimo: parseInt(f.stock_minimo, 10) || 5,
      badge: f.badge || null,
      imagen_url: f.imagen_url || null,
    };

    const { data, error } = await createProduct(payload);
    if (error) {
      showToast("Error al crear producto", "error");
      return;
    }

    setProducts((prev) => [data, ...prev]);
    setCreateProductForm(emptyProductForm);
    setShowCreateProduct(false);
    showToast("Producto creado");
  };

  const editProduct = (product) => {
    setEditingPackId(null);
    setShowCreateProduct(false);
    setShowCreatePack(false);
    setEditingProductId(product.id);
    setEditProductForm({
      nombre: product.nombre,
      descripcion: product.descripcion || "",
      categoria: product.categoria,
      precio: product.precio,
      precio_anterior: product.precio_anterior || "",
      stock: product.stock,
      stock_minimo: product.stock_minimo ?? 5,
      badge: product.badge || "",
      imagen_url: product.imagen_url || "",
      activo: product.activo,
    });
  };

  const cancelEditProduct = () => {
    setEditingProductId(null);
    setEditProductForm({});
  };

  const updateEditProductField = (field, value) => {
    setEditProductForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProduct = async () => {
    const f = editProductForm;
    if (!f.nombre?.trim() || !f.precio || f.stock === "") {
      showToast("Completa nombre, precio y stock", "error");
      return;
    }

    const { data, error } = await updateProduct(editingProductId, {
      nombre: f.nombre.trim(),
      descripcion: f.descripcion?.trim() || null,
      categoria: f.categoria,
      precio: parseFloat(f.precio),
      precio_anterior: f.precio_anterior ? parseFloat(f.precio_anterior) : null,
      stock: parseInt(f.stock, 10),
      stock_minimo: parseInt(f.stock_minimo, 10) || 5,
      badge: f.badge || null,
      imagen_url: f.imagen_url || null,
      activo: f.activo,
    });

    if (error) {
      showToast("Error al actualizar producto", "error");
      return;
    }

    setProducts((prev) => prev.map((p) => (p.id === data.id ? data : p)));
    cancelEditProduct();
    showToast("Producto actualizado");
  };

  const handleDeleteProduct = async (id) => {
    const { error } = await deleteProduct(id);
    if (error) {
      showToast("Error al eliminar. Puede tener órdenes asociadas.", "error");
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setConfirmDeleteProductId(null);
    showToast("Producto eliminado");
  };

  // ── Stock quick update ──
  const handleStockChange = async (productId, delta) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const newStock = Math.max(0, product.stock + delta);
    const { data, error } = await updateProduct(productId, { stock: newStock });

    if (error) {
      showToast("Error al actualizar stock", "error");
      return;
    }

    setProducts((prev) => prev.map((p) => (p.id === data.id ? data : p)));
  };

  // ── Pack CRUD ──
  const toggleCreatePack = () => {
    if (showCreatePack) {
      setCreatePackForm(emptyPackForm);
      setShowCreatePack(false);
      return;
    }
    cancelEditProduct();
    setShowCreateProduct(false);
    setShowCreatePack(true);
  };

  const updateCreatePackField = (field, value) => {
    setCreatePackForm((prev) => ({ ...prev, [field]: value }));
  };

  const addPackItem = (productId, cantidad = 1) => {
    setCreatePackForm((prev) => {
      if (prev.items.some((i) => i.product_id === productId)) return prev;
      return {
        ...prev,
        items: [...prev.items, { product_id: productId, cantidad }],
      };
    });
  };

  const removePackItem = (productId) => {
    setCreatePackForm((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.product_id !== productId),
    }));
  };

  const updatePackItemQty = (productId, cantidad) => {
    setCreatePackForm((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.product_id === productId
          ? { ...i, cantidad: Math.max(1, cantidad) }
          : i,
      ),
    }));
  };

  const handleCreatePack = async () => {
    const f = createPackForm;
    if (!f.nombre.trim() || !f.precio) {
      showToast("Completa nombre y precio del pack", "error");
      return;
    }
    if (f.items.length === 0) {
      showToast("Agrega al menos un producto al pack", "error");
      return;
    }

    const { data, error } = await createPack(
      {
        nombre: f.nombre.trim(),
        descripcion: f.descripcion?.trim() || null,
        precio: parseFloat(f.precio),
        imagen_url: f.imagen_url || null,
      },
      f.items,
    );

    if (error) {
      showToast("Error al crear pack", "error");
      return;
    }

    setPacks((prev) => [data, ...prev]);
    setCreatePackForm(emptyPackForm);
    setShowCreatePack(false);
    showToast("Pack creado");
  };

  const editPackStart = (pack) => {
    cancelEditProduct();
    setShowCreateProduct(false);
    setShowCreatePack(false);
    setEditingPackId(pack.id);
    setEditPackForm({
      nombre: pack.nombre,
      descripcion: pack.descripcion || "",
      precio: pack.precio,
      imagen_url: pack.imagen_url || "",
      activo: pack.activo,
      items: (pack.pack_items || []).map((pi) => ({
        product_id: pi.product_id,
        cantidad: pi.cantidad,
      })),
    });
  };

  const cancelEditPack = () => {
    setEditingPackId(null);
    setEditPackForm({});
  };

  const updateEditPackField = (field, value) => {
    setEditPackForm((prev) => ({ ...prev, [field]: value }));
  };

  const addEditPackItem = (productId, cantidad = 1) => {
    setEditPackForm((prev) => {
      if (prev.items?.some((i) => i.product_id === productId)) return prev;
      return {
        ...prev,
        items: [...(prev.items || []), { product_id: productId, cantidad }],
      };
    });
  };

  const removeEditPackItem = (productId) => {
    setEditPackForm((prev) => ({
      ...prev,
      items: (prev.items || []).filter((i) => i.product_id !== productId),
    }));
  };

  const updateEditPackItemQty = (productId, cantidad) => {
    setEditPackForm((prev) => ({
      ...prev,
      items: (prev.items || []).map((i) =>
        i.product_id === productId
          ? { ...i, cantidad: Math.max(1, cantidad) }
          : i,
      ),
    }));
  };

  const handleSavePack = async () => {
    const f = editPackForm;
    if (!f.nombre?.trim() || !f.precio) {
      showToast("Completa nombre y precio", "error");
      return;
    }

    const { data, error } = await updatePack(
      editingPackId,
      {
        nombre: f.nombre.trim(),
        descripcion: f.descripcion?.trim() || null,
        precio: parseFloat(f.precio),
        imagen_url: f.imagen_url || null,
        activo: f.activo,
      },
      f.items || [],
    );

    if (error) {
      showToast("Error al actualizar pack", "error");
      return;
    }

    setPacks((prev) => prev.map((p) => (p.id === data.id ? data : p)));
    cancelEditPack();
    showToast("Pack actualizado");
  };

  const handleDeletePack = async (id) => {
    const { error } = await deletePack(id);
    if (error) {
      showToast("Error al eliminar pack", "error");
      return;
    }
    setPacks((prev) => prev.filter((p) => p.id !== id));
    setConfirmDeletePackId(null);
    showToast("Pack eliminado");
  };

  // ── Helpers ──
  const formatPrice = (price) => {
    if (!price && price !== 0) return "";
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getProductName = (productId) =>
    products.find((p) => p.id === productId)?.nombre || "—";

  const getCategoryLabel = (cat) => {
    const map = {
      equipo: "Equipo",
      ropa: "Ropa",
      accesorios: "Accesorios",
      suplementos: "Suplementos",
      botellas: "Botellas",
      giftcards: "Gift Cards",
    };
    return map[cat] || cat;
  };

  const getCategoryBadgeClass = (cat) => {
    const map = {
      equipo: "inv-badge-equipo",
      ropa: "inv-badge-ropa",
      accesorios: "inv-badge-accesorios",
      suplementos: "inv-badge-suplementos",
      botellas: "inv-badge-botellas",
      giftcards: "inv-badge-giftcards",
    };
    return map[cat] || "inv-badge-equipo";
  };

  return {
    // Data
    products,
    packs,
    loading,
    filteredProducts,
    filteredPacks,
    lowStockProducts,
    categorias: CATEGORIAS,
    badges: BADGES,

    // Tabs & Filters
    tab,
    setTab,
    search,
    setSearch,
    filterCategoria,
    setFilterCategoria,

    // Product create
    showCreateProduct,
    createProductForm,
    toggleCreateProduct,
    updateCreateProductField,
    handleCreateProduct,

    // Product edit
    editingProductId,
    editProductForm,
    editProduct,
    cancelEditProduct,
    updateEditProductField,
    handleSaveProduct,

    // Product delete
    confirmDeleteProductId,
    setConfirmDeleteProductId,
    handleDeleteProduct,

    // Stock
    handleStockChange,

    // Pack create
    showCreatePack,
    createPackForm,
    toggleCreatePack,
    updateCreatePackField,
    addPackItem,
    removePackItem,
    updatePackItemQty,
    handleCreatePack,

    // Pack edit
    editingPackId,
    editPackForm,
    editPackStart,
    cancelEditPack,
    updateEditPackField,
    addEditPackItem,
    removeEditPackItem,
    updateEditPackItemQty,
    handleSavePack,

    // Pack delete
    confirmDeletePackId,
    setConfirmDeletePackId,
    handleDeletePack,

    // Image
    uploadingImage,
    handleImageUpload,

    // Helpers
    formatPrice,
    getProductName,
    getCategoryLabel,
    getCategoryBadgeClass,
  };
}
