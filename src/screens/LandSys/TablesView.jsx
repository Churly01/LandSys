import {
  Tabs,
  Tab,
} from "@nextui-org/react";
import BaseTable from './Tables/BaseTable.jsx';

const TablesView = () => {
  return (
    <div>
      <h1>Tables</h1>
      <Tabs>
        <Tab
          title="Parcelas"
        >
        </Tab>
        <Tab
          title="Terrenos"
        >
          <BaseTable
            fields={['id']}
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
