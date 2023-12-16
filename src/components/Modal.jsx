import { useState, useEffect } from "react";
import CerrarModal from "../img/cerrar.svg";
import { Mensaje } from "./Mensaje";

export const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  presupuesto,
  guardarGasto,
  gastoEditar,
  setGastoEditar,
}) => {
  const [mensaje, setMensaje] = useState("");

  const [nombreGasto, setNombreGasto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [id, setId] = useState("");
  const [fecha, setFecha] = useState("");

  const ocultarModal = () => {
    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
      setGastoEditar({});
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombreGasto, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");

      setTimeout(() => {
        setMensaje("");
        return;
      }, 5000);
    }

    guardarGasto({ nombreGasto, cantidad, categoria, id, fecha });
    ocultarModal();
  };

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombreGasto(gastoEditar.nombreGasto);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
      setId(gastoEditar.id);
      setFecha(gastoEditar.fecha);
    }
  }, [gastoEditar]);

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={CerrarModal} alt="Icono Cerrar" onClick={ocultarModal} />
      </div>

      <form className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
        <legend>
          {Object.keys(gastoEditar).length > 0 ? "Editar gasto" : "Nuevo Gasto"}
        </legend>
        {mensaje && <Mensaje tipo={"error"}>{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombreg">Nombre Gasto</label>
          <input
            type="text"
            name="nombreg"
            id="nombreg"
            placeholder="Añade el Nombre del Gasto"
            value={nombreGasto}
            onChange={(e) => {
              setNombreGasto(e.target.value);
            }}
          />
        </div>
        {/* -------------------------------------------- */}
        <div className="campo">
          <label htmlFor="cantidad">Cantidad: </label>
          <input
            type="number"
            name="cantidad"
            id="cantidad"
            placeholder="Añade la Cantidad del gasto"
            value={cantidad}
            onChange={(e) => {
              setCantidad(Number(e.target.value));
            }}
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select
            name="categoria"
            id="categoria"
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
            }}
          >
            <option value="" disabled>
              -- Seleccione --
            </option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input
          type="submit"
          name="añadir"
          value={
            Object.keys(gastoEditar).length > 0
              ? "Guardar Cambios"
              : "Añadir Gasto"
          }
          id="añadir"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};
