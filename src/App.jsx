import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import { generarID } from "./helpers";

import { ListadoGastos } from "./components/ListadoGastos";

import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import { Filtros } from "./components/Filtros";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? ""
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      handleNuevoGasto();
    }
  }, [gastoEditar]);

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
    } else {
      // Nuevo gasto
      gasto.id = generarID();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
  };

  const handleNuevoGasto = () => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 250);
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id != id);
    setGastos(gastosActualizados);
  };

  // Guarda el presupuesto
  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? "");
  }, [presupuesto]);

  // Valida que hay un presupuesto almacenado y lo carga
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? "";

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  // Almacena los gastos
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos)) ?? [];
  }, [gastos]);

  // Detecta los cambios en el filtro
  useEffect(() => {
    if (filtro) {
      // Filtrar gastos por categoria
      const gastosFiltrados = gastos.filter((gasto) => {
        return gasto.categoria === filtro;
      });

      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  return (
    <>
      <div className={modal ? "fijar" : ""}>
        <Header
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
          gastos={gastos}
          setGastos={setGastos}
        />

        {isValidPresupuesto && (
          <>
            <main>
              <Filtros filtro={filtro} setFiltro={setFiltro} />
              <ListadoGastos
                gastos={filtro ? gastosFiltrados : gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                setFiltro={setFiltro}
              />
            </main>
            <div className="nuevo-gasto">
              <img
                src={IconoNuevoGasto}
                alt="Icono"
                onClick={handleNuevoGasto}
              />
            </div>
          </>
        )}

        {modal && (
          <Modal
            setModal={setModal}
            animarModal={animarModal}
            setAnimarModal={setAnimarModal}
            presupuesto={presupuesto}
            guardarGasto={guardarGasto}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
          />
        )}
      </div>
    </>
  );
}

export default App;
