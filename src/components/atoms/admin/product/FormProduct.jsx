import { useState, useEffect } from "react";
import { useContextGlobal } from "../../../../contexts/global.context";
import ListImages from "../../form/ListImages";
import Buttons from "../../Buttons";
import Swal from "sweetalert2";
import { fetchData } from "../../../../utils/js/apiRequest";
import { ColorRing } from "react-loader-spinner";
import FeatureSelection from "./FeatureSelection";

const FormProduct = ({ type, id }) => {
  const initialProductState = {
    name: "",
    description: "",
    stock: 0,
    price: 0,
    rentType: "DAILY",
    categoryId: 0,
    attachments: [],
  };

  const [loading, setLoading] = useState(false);
  const { state, getProducts, getCategories, addProduct, updateProduct } =
    useContextGlobal();
  const { data, categories } = state;
  const [product, setProduct] = useState(initialProductState);
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [allImagesUploaded, setAllImagesUploaded] = useState(true);
  const [initialData, setInitialData] = useState(initialProductState);
  const { token, products } = state;
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (type === "editarProduct" && id) {
      const productToEdit = data.find((product) => product.id === id);
      if (productToEdit) {
        setProduct({
          ...productToEdit,
          attachments: productToEdit.attachments || [],
        });
        setInitialData({
          ...productToEdit,
          attachments: productToEdit.attachments || [],
        });
        console.log(
          "Imágenes iniciales del producto:",
          productToEdit.attachments
        );
      }
    }
  }, [id, type, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleImageChange = (images) => {
    setProduct((prevProduct) => ({ ...prevProduct, attachments: images }));
    console.log("Imágenes actualizadas del producto:", images);
  };

  const onAllImagesUploaded = (status) => {
    if (type !== "editarProduct") {
      setAllImagesUploaded(status);
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = parseInt(e.target.value);
    setProduct((prevProduct) => ({ ...prevProduct, categoryId }));
    // Filtrar las features correspondientes a la categoría seleccionada
    const selectedCategory = categories.find(
      (category) => category.id === categoryId
    );
    if (selectedCategory) {
      setFeatures(selectedCategory.features || []);
    }
  };

  const handleFeatureSelect = (featureId) => {
    // Manejar la selección de features
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures((prevSelectedFeatures) =>
        prevSelectedFeatures.filter((id) => id !== featureId)
      );
    } else {
      setSelectedFeatures((prevSelectedFeatures) => [
        ...prevSelectedFeatures,
        featureId,
      ]);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!product.name) formErrors.name = "Por favor complete este campo.";
    if (!product.description)
      formErrors.description = "Por favor complete este campo.";
    if (!product.price) formErrors.price = "Por favor complete este campo.";
    if (isNaN(parseFloat(product.price)))
      formErrors.price = "Precio debe ser numérico.";
    if (!product.stock) formErrors.stock = "Por favor complete este campo.";
    if (isNaN(parseInt(product.stock)))
      formErrors.stock = "Stock debe ser numérico entero.";
    if (!product.categoryId)
      formErrors.categoryId = "Por favor complete este campo.";
    return formErrors;
  };

  const getUpdatedFields = (initial, current) => {
    let updatedFields = {};
    for (let key in current) {
      if (current[key] !== initial[key]) {
        updatedFields[key] = current[key];
      }
    }
    return updatedFields;
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }
    setLoading(true);

    try {
      const productData = {
        name: product.name,
        description: product.description,
        stock: parseInt(product.stock),
        price: parseFloat(product.price),
        rentType: product.rentType,
        categoryId: parseInt(product.categoryId),
        featureIds: selectedFeatures,
        attachments: product.attachments.map((image) => image.id),
      };

      console.log("Datos enviados:", productData);

      let response;

      if (type === "editarProduct" && id) {
        response = await fetchData({
          method: "put",
          endpoint: `/products/${id}`,
          data: productData,
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire({
          title: "¡Éxito!",
          text: "Producto actualizado correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 1800,
        });
      } else {
        response = await fetchData({
          method: "post",
          endpoint: "/products",
          data: productData,
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire({
          title: "¡Éxito!",
          text: "Producto registrado correctamente",
          icon: "success",
          showConfirmButton: false,
          timer: 1800,
        });
        setProduct(initialProductState);
      }
      await getProducts();
      setError({});
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Ha ocurrido un error al procesar la solicitud.";

      if (errorMessage.includes("ID de archivo adjunto no válido")) {
        Swal.fire({
          title: "Error",
          text: "Tamaño de imagen muy grande",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A29C9B",
        });
      } else if (errorMessage.includes("Request failed with status code 403")) {
        Swal.fire({
          title: "Error",
          text: "El servidor ha rechazado su solicitud",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A29C9B",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A29C9B",
        });
      }

      setError({ message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <form
        className="grid grid-cols-1 md:grid-cols-2 modalInfo g-15"
        onSubmit={saveProduct}
      >
        {id && (
          <span className="txt-accent paragraph">
            <strong>ID:</strong> {id}
          </span>
        )}
        <div className="grid col-span-1 md:col-span-2 g-5">
          <label className="txt-accent paragraph">
            <strong>Nombre:</strong>
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-white txt-tertiary"
          />
          {error.name && (
            <p className="text-red-500 text-xs italic">{error.name}</p>
          )}
        </div>
        <div className="grid col-span-1 md:col-span-2 g-5">
          <label className="txt-accent paragraph">
            <strong>Descripción:</strong>
          </label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-white txt-tertiary"
          />
          {error.description && (
            <p className="text-red-500 text-xs italic">{error.description}</p>
          )}
        </div>

        <div className="grid g-5">
          <label className="txt-accent paragraph">
            <strong>Precio:</strong>
          </label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-white txt-tertiary"
          />
          {error.price && (
            <p className="text-red-500 text-xs italic">{error.price}</p>
          )}
        </div>
        <div className="grid g-5">
          <label className="txt-accent paragraph">
            <strong>Tipo de renta:</strong>
          </label>
          <select
            name="rentType"
            value={product.rentType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-white txt-tertiary"
          >
            <option value="DAILY">Diario</option>
            <option value="WEEKLY">Semanal</option>
            <option value="MONTHLY">Mensual</option>
          </select>
        </div>
        <div className="grid g-5">
          <label className="txt-accent paragraph">
            <strong>Stock:</strong>
          </label>
          <input
            type="text"
            name="stock"
            value={product.stock}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-white txt-tertiary"
          />
          {error.stock && (
            <p className="text-red-500 text-xs italic">{error.stock}</p>
          )}
        </div>
        <div className="grid g-5">
          <label className="txt-accent paragraph">
            <strong>Categoría:</strong>
          </label>
          <select
            name="categoryId"
            value={product.categoryId}
            onChange={handleCategoryChange}
            className="w-full p-2 border rounded bg-white txt-tertiary"
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {error.categoryId && (
            <p className="text-red-500 text-xs italic">{error.categoryId}</p>
          )}
        </div>
        {console.log(product.categoryId)}
        {product.categoryId != 0 && (
          <FeatureSelection
            features={features}
            selectedFeatures={selectedFeatures}
            onFeatureSelect={handleFeatureSelect}
          />
        )}

        <span className="bg-base col-span-1 md:col-span-2 grid w-full h-px"></span>
        <div className="col-span-1 md:col-span-2 grid g-5">
          <ListImages
            images={product.attachments}
            onImageChange={handleImageChange}
            onAllImagesUploaded={onAllImagesUploaded}
            multiple
          />
        </div>
        {allImagesUploaded || type === "editarProduct" ? (
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <Buttons
              text={type === "editarProduct" ? "Actualizar" : "Crear"}
              type="submit"
              bColor="#A62639"
              color="#fff"
              bgColor="#A62639"
            />
          </div>
        ) : null}
        {loading && (
          <div className="loading-spinner">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#A62639", "#DB324D", "#56494E", "#A29C9B", "#511C29"]}
            />
          </div>
        )}
      </form>
    </>
  );
};

export default FormProduct;
