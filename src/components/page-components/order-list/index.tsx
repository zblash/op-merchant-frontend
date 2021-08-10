import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { colors, css } from '@/styled';
import { UILink, UIEditIcon } from '@/components/ui';
import { IOrder, TOrderStatus } from '@/utils/api/api-models';
import { UITableComponent } from '@/components/ui/table/index';
import { Button } from 'react-bootstrap';
import { OrderListFilterComponent } from './filter';

/* OrderListComponent Helpers */
interface OrderListComponentProps {
  orders: IOrder[];
  elementCountOfPage: number;
  setSortBy: (e: any) => void;
  setSortType: (e: any) => void;
  setCustomer?: (e: string) => void;
  setDate?: (e: Date) => void;
  setStatus: (e: TOrderStatus) => void;
  handlePdfBtnClick: (e: IOrder) => void;
  status?: TOrderStatus;
  onPageChange?: (pageNumber: number) => void;
}

/* OrderListComponent Constants */
const ORDER_STATUS_MAP: Record<TOrderStatus, string> = {
  NEW: 'Yeni',
  FINISHED: 'Teslim Edildi',
  CANCELLED: 'Iptal Edildi',
  CONFIRMED: 'Onaylandi',
  CANCEL_REQUEST: 'Iptal Istegi',
  PREPARED: 'Hazirlaniyor/Hazir',
};
/* OrderListComponent Styles */
const StyledActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledLink = styled(UILink)`
  color: ${colors.primaryDark};
`;
const commonIconStyle = css`
  cursor: pointer;
  margin: 0 8px;
`;
/* OrderListComponent Component  */
function OrderListComponent(props: React.PropsWithChildren<OrderListComponentProps>) {
  /* OrderListComponent Variables */
  const { t } = useTranslation();
  /* OrderListComponent Callbacks */

  /* OrderListComponent Lifecycle  */

  return (
    <>
      {props.setCustomer && (
        <OrderListFilterComponent
          status={props.status}
          setStatus={props.setStatus}
          setCustomer={props.setCustomer}
          setLastDate={props.setDate}
        />
      )}

      <UITableComponent
        columns={[
          {
            Header: t('order.code'),
            accessor: 'id',
            sort: true,
            sortType: 'desc',
            customRenderer: (item: IOrder) => item.id.slice(0, 10),
          },
          {
            Header: t('common.customer'),
            accessor: 'buyerName',
          },
          {
            Header: t('order.order-date'),
            accessor: 'orderDate',
          },
          {
            Header: t('order.order-waybill-date'),
            accessor: 'waybillDate',
          },
          {
            Header: t('order.quantity'),
            accessor: 'quantity',
            sort: true,
            sortType: 'desc',
            customRenderer: (item: IOrder) => item.orderItems.length,
          },
          {
            Header: t('order.status-text'),
            accessor: 'status',
            customRenderer: (item: IOrder) => ORDER_STATUS_MAP[item.status],
          },
          {
            Header: t('common.total-price'),
            accessor: 'totalPrice',
            customRenderer: (item: IOrder) => `${item.totalPrice} TL`,
          },
          {
            Header: '',
            accessor: 'operations',
            customRenderer: (item: IOrder) => (
              <StyledActionsWrapper>
                {(item.status === 'CONFIRMED' || item.status === 'PREPARED') && (
                  <UIEditIcon color="#74b126" className={commonIconStyle} size={16} />
                )}
                <StyledLink to={`/order/${item.id}`}>{t('common.details')}</StyledLink>
                {item.status === 'FINISHED' && <Button onClick={x => props.handlePdfBtnClick(item)}>Yazdir</Button>}
              </StyledActionsWrapper>
            ),
          },
        ]}
        data={props.orders}
        currentPage={1}
        onPageChange={props.onPageChange}
        pagination
        showLastOrFirstPage
        showPageSize={7}
        totalPages={props.elementCountOfPage}
      />
    </>
  );
}
const PureOrderListComponent = React.memo(OrderListComponent);

export { PureOrderListComponent as OrderListComponent };
