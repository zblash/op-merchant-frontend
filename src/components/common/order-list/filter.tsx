import * as React from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import styled, { colors, css } from '~/styled';
import { UIButton } from '~/components/ui';
import { TOrderStatus } from '~/services/helpers/backend-models';

/* OrderListFilterComponent Helpers */
interface OrderListFilterComponentProps {
  setCustomer: (e: string) => void;
  setLastDate: (e: Date) => void;
  setStatus: (e: TOrderStatus) => void;
  status?: TOrderStatus;
}
/* OrderListFilterComponent Constants */

/* OrderListFilterComponent Styles */
const StyledFilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    display: block;
  }
`;
const StyledNameInput = styled.input`
  float: left;  
  border: 1px solid ${colors.lightGray};
  border-radius: 6px;
  padding 7px 9px;
  margin-right: 5px;
`;
const StyledNameInputBtn = styled(UIButton)`
  padding: 0 65px;
  @media (max-width: 768px) {
    width: 90%;
    margin: 5px auto 10px auto;
  }
`;
const StyledNameLabel = styled.label`
  margin-right: 7px;
  padding: 3px;
  float: left;
`;
const StyledFilterComp = styled.div`
  width: 25%;
  float: left;
  @media (max-width: 768px) {
    width: 90%;
    margin: 5px auto 10px auto;
    padding: 10px;
  }
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
    <StyledFilterWrapper>
      <StyledFilterComp>
        <Select
          value={selectedStatus}
          onChange={(e: { value: TOrderStatus; label: string }) => setSelectedStatus(e)}
          options={statusList}
          placeholder="Siparis Durumu"
        />
      </StyledFilterComp>
      <StyledFilterComp>
        <StyledNameLabel>Kullanici Ismi: </StyledNameLabel>
        <StyledNameInput
          placeholder="Musteri ismi"
          id="name-filter"
          value={customer}
          onChange={handleFilterNameChange}
        />
      </StyledFilterComp>
      <StyledFilterComp>
        <StyledNameLabel>Tarih: </StyledNameLabel>
        <DatePicker
          selected={lastDate}
          maxDate={new Date()}
          onChange={selectedDate => setLastDate(selectedDate)}
          locale="tr"
          dateFormat="yyyy-MM-dd"
          className={DatePickerBtn}
        />
      </StyledFilterComp>
      <StyledNameInputBtn disabled={!lastDate && !customer && !selectedStatus} onClick={handleFilter}>
        Filtrele
      </StyledNameInputBtn>
    </StyledFilterWrapper>
  );
}
const PureOrderListFilterComponent = React.memo(OrderListFilterComponent);

export { PureOrderListFilterComponent as OrderListFilterComponent };
