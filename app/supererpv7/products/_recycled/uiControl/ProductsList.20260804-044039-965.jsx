'use client';
import { ProductsSchema } from '../schema';
import SmartGrid from '../../moduleControl/UiControl/SmartGrid';
import ProductsActions from '../logicControl/actionsRegistry';

// Thin wrapper only — all real grid logic lives in components/EntityGrid.jsx
// export default function ProductsList() {
//   return <SmartGrid moduleActions={ProductsActions} schema={ProductsSchema} title="Products" />;
// }
export default function ProductsList({
  fixedQuery = {},
  dataOut = {},
  title = 'Products',
  description = 'Products list ',
  customProfilePath = './profile',
  moduleActions = ProductsActions,
  schema = ProductsSchema,
}) {
  return (
    <SmartGrid
      moduleActions={moduleActions}
      schema={schema}
      title={title}
      description={description}
      customProfilePath={customProfilePath}
      fixedQuery={fixedQuery}
      dataOut={dataOut}
    />
  );
}