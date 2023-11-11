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
          />
        </Tab>
        <Tab>
        </Tab>
      </Tabs>
    </div>
  );
}
export default TablesView;
