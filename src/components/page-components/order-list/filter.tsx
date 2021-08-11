import * as React from 'react';
import DatePicker from 'react-datepicker';
import styled, { colors, css } from '@/styled';
import { TOrderStatus } from '@/services/helpers/backend-models';
import { Button, Row, Col } from 'react-bootstrap';
import { UISelect, UIInput } from '@/components/ui';

/* OrderListFilterComponent Helpers */
interface OrderListFilterComponentProps {
  setCustomer: (e: string) => void;
  setLastDate: (e: Date) => void;
  setStatus: (e: TOrderStatus) => void;
  status?: TOrderStatus;
}
/* OrderListFilterComponent Constants */

/* OrderListFilterComponent Styles */
const StyledNameLabel = styled.label`
  margin-right: 7px;
  padding: 3px;
  float: left;
`;
const DatePickerBtn = css`
  border: 2px solid ${colors.lightGray};
  border-radius: 4px;
  width: 99%;
  padding-left: 1%;
  height: 26px;
`;
/* OrderListFilterComponent Component  */
function OrderListFilterComponent(props: React.PropsWithChildren<OrderListFilterComponentProps>) {
  /* OrderListFilterComponent Variables */
  const statusList = React.useMemo<{ value: TOrderStatus; label: string }[]>(() => {
    return [
      { value: 'FINISHED', label: 'Teslim Edildi' },
      { value: 'PREPARED', label: 'Hazirlaniyor' },
      { value: 'NEW', label: 'Yeni' },
      { value: 'CONFIRMED', label: 'Onaylanan' },
      { value: 'CANCELLED', label: 'Iptal' },
      { value: 'CANCEL_REQUEST', label: 'Iptal Isteginde' },
    ];
  }, []);
  const [customer, setCustomer] = React.useState<string>('');
  const [lastDate, setLastDate] = React.useState<Date>();
  const [selectedStatus, setSelectedStatus] = React.useState<{ value: TOrderStatus; label: string }>(
    statusList.find(opt => opt.value === props.status),
  );
  /* OrderListFilterComponent Callbacks */
  const handleFilterNameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer(e.target.value);
  }, []);
  const handleFilter = React.useCallback(() => {
    if (customer) {
      props.setCustomer(customer);
    }
    if (lastDate) {
      props.setLastDate(lastDate);
    }
    if (selectedStatus) {
      props.setStatus(selectedStatus.value);
    }
  }, [customer, lastDate, props, selectedStatus]);
  /* OrderListFilterComponent Lifecycle  */

  return (
    <Row>
      <Col lg={3} md={3} xl={3} sm={12} xs={12}>
        <UISelect
          value={selectedStatus}
          onChange={(e: { value: TOrderStatus; label: string }) => setSelectedStatus(e)}
          options={statusList}
          placeholderKey="Secim Yapin"
          labelKey="Siparis Durumu"
        />
      </Col>
      <Col lg={3} md={3} xl={3} sm={12} xs={12}>
        <UIInput
          placeholderKey="Musteri ismi"
          labelKey="Kullanici Ismi"
          name="name-filter"
          id="name-filter"
          value={customer}
          onChange={handleFilterNameChange}
        />
      </Col>
      <Col lg={3} md={3} xl={3} sm={12} xs={12} className="d-flex justify-content-center align-items-center">
        <StyledNameLabel>Tarih: </StyledNameLabel>
        <DatePicker
          selected={lastDate}
          maxDate={new Date()}
          onChange={selectedDate => setLastDate(selectedDate)}
          locale="tr"
          dateFormat="yyyy-MM-dd"
          className={DatePickerBtn}
        />
      </Col>
      <Col lg={3} md={3} xl={3} sm={12} xs={12} className="d-flex justify-content-end align-items-center">
        <Button disabled={!lastDate && !customer && !selectedStatus} onClick={handleFilter}>
          Filtrele
        </Button>
      </Col>
    </Row>
  );
}
const PureOrderListFilterComponent = React.memo(OrderListFilterComponent);

export { PureOrderListFilterComponent as OrderListFilterComponent };
