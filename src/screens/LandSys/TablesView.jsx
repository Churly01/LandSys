import {
  Tabs,
  Tab,
} from "@nextui-org/react";
import BaseTable from './Tables/BaseTable.jsx';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
const TablesView = () => {
  const { hash } = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <Tabs
        selectedKey={hash}
        onSelectionChange={(key) => {
          navigate(`/tables${key}`);
        }}
      >
        <Tab
          title="Parcelas"
          key="#parcelas"
        >
          <BaseTable
            fields={['dirección', 'límites', 'id_terreno', 'número']}
            entity='parcelas'
            singular_entity='parcela'
          />
        </Tab>
        <Tab
          title="Terrenos"
          key="#terrenos"
          onClick={() => {
            console.log('clicked');
          }}
        >
          <BaseTable
            fields={['dirección', 'tamaño (ha)', 'límites', 'tipo_terreno']}
            entity='terrenos'
            singular_entity='terreno'
          />
        </Tab>
        <Tab
          title="Arrendatarios"
          key="#arrendatarios"
        >
          <BaseTable
            fields={['nombre', 'primer_apellido', 'segundo_apellido', 'NIF', 'fecha_nacimiento', 'sexo','nómina', 'aval_bancario', 'contrato_trabajo', 'aval_terceros']}
            entity='arrendatarios'
            singular_entity='arrendatario'
          />
        </Tab>
        <Tab
          title="Alquileres"
          key="#alquileres"
        >
          <BaseTable
            fields={['fecha_inicio', 'periodo', 'importe', 'id_arrendatario', 'id_parcela']}
            entity='alquileres'
            singular_entity='alquiler'
          />
        </Tab>
      </Tabs>
    </div>
  );
}
export default TablesView;
