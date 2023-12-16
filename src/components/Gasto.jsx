import { formatearFecha } from "../helpers";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import IconoAhorro from "../img/icono_ahorro.svg";
import IconoCasa from "../img/icono_casa.svg";
import IconoComida from "../img/icono_comida.svg";
import IconoGastos from "../img/icono_gastos.svg";
import IconoOcio from "../img/icono_ocio.svg";
import IconoSalud from "../img/icono_salud.svg";
import IconoSuscripciones from "../img/icono_suscripciones.svg";

const diccionarioIconos = {
  ahorro: IconoAhorro,
  comida: IconoComida,
  casa: IconoCasa,
  gastos: IconoGastos,
  ocio: IconoOcio,
  salud: IconoSalud,
  suscripciones: IconoSuscripciones,
};

export const Gasto = ({ gasto, setGastoEditar, eliminarGasto, setFiltro }) => {
  {
    /* Editar */
  }
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          setGastoEditar(gasto);
          setTimeout(() => {
            setFiltro("");
          }, 250);
        }}
      >
        Editar
      </SwipeAction>
    </LeadingActions>
  );
  {
    /* Eliminar */
  }
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          eliminarGasto(gasto.id);
          setTimeout(() => {
            setFiltro("");
          }, 250);
        }}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={diccionarioIconos[gasto.categoria]} alt="Icono gasto" />
            <div className="descripcion-gasto">
              <p className="categoria">{gasto.categoria}</p>
              <p className="nombre-gasto">{gasto.nombreGasto}</p>
              <p className="fecha-gasto">
                Agregado el: {""}
                <span>{formatearFecha(gasto.fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${gasto.cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};