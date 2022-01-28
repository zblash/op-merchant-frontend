import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import {
  IAddressStateResponse,
  IShippingDaysResponse,
  DaysOfWeek,
  UITableComponent,
  UIEditIcon,
} from '@zblash/op-web-fronted';
import { AddShippingDaysPopupComponent } from './add-shipping-days-popup';
import { EditShippingDaysPopupComponent } from './edit-shipping-days-popup';

interface ShippingDaysComponentProps {
  shippingDays: IShippingDaysResponse[];
  statesForShippingDays: IAddressStateResponse[];
  onAddSubmit: (stateId: string, days: DaysOfWeek[]) => void;
  onEditSubmit: (id: string, days: DaysOfWeek[]) => void;
}

/* ShippingDaysComponent Component  */
function ShippingDaysComponent(props: React.PropsWithChildren<ShippingDaysComponentProps>) {
  /* ShippingDaysComponent Variables */
  const [isAddModalShowing, setIsAddModalShowing] = React.useState<boolean>(false);
  const [isEditModalShowing, setIsEditModalShowing] = React.useState<boolean>(false);
  const [selectedShippingId, setSelectedShippingId] = React.useState<string>();
  const [selectedShippingName, setSelectedShippingName] = React.useState<string>();
  const [selectedShippingDays, setSelectedShippingDays] = React.useState<DaysOfWeek[]>();
  /* ShippingDaysComponent Callbacks */

  /* ShippingDaysComponent Lifecycle  */

  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={12} xl={12} xs={12} className="d-flex justify-content-between mb-2">
          <h3 className="font-size-19-bold">Teslimat Gunleriniz</h3>
          <Button
            variant="secondary"
            onClick={() => {
              setIsAddModalShowing(true);
            }}
          >
            Yeni Ekle
          </Button>
        </Col>
        <Col lg={12} md={12} sm={12} xl={12} xs={12}>
          <UITableComponent
            columns={[
              {
                Header: 'Sehir',
                accessor: 'cityName',
                customRenderer: (item: IShippingDaysResponse) => item.cityName,
              },
              {
                Header: 'Ilce',
                accessor: 'finishedOrderCount',
                customRenderer: (item: IShippingDaysResponse) => item.stateName,
              },
              {
                Header: 'Teslimat Gunleri',
                accessor: 'cancelledOrderCount',
                customRenderer: (item: IShippingDaysResponse) => <span>{item.days.map(day => day).join('-')}</span>,
              },
              {
                Header: 'Islem',
                accessor: 'operations',
                customRenderer: (item: IShippingDaysResponse) => (
                  <Button
                    className="p-0"
                    variant="link"
                    onClick={() => {
                      setSelectedShippingId(item.id);
                      setSelectedShippingName(`${item.cityName} - ${item.stateName}`);
                      setSelectedShippingDays(item.days);
                      setIsEditModalShowing(true);
                    }}
                  >
                    <UIEditIcon />
                  </Button>
                ),
              },
            ]}
            data={props.shippingDays}
          />
        </Col>
      </Row>
      <AddShippingDaysPopupComponent
        isOpened={isAddModalShowing}
        onShowingChanged={(e: boolean) => {
          setIsAddModalShowing(e);
        }}
        states={props.statesForShippingDays}
        onSubmit={(stateId: string, days: DaysOfWeek[]) => {
          setIsAddModalShowing(false);
          props.onAddSubmit(stateId, days);
        }}
      />
      <EditShippingDaysPopupComponent
        isOpened={isEditModalShowing}
        onShowingChanged={(e: boolean) => {
          setIsEditModalShowing(e);
        }}
        id={selectedShippingId}
        stateName={selectedShippingName}
        shippingDays={selectedShippingDays}
        onSubmit={(id: string, days: DaysOfWeek[]) => {
          props.onEditSubmit(id, days);
          setIsEditModalShowing(false);
        }}
      />
    </>
  );
}
const PureShippingDaysComponent = React.memo(ShippingDaysComponent);

export { PureShippingDaysComponent as ShippingDaysComponent };
