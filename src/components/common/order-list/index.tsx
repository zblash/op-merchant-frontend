import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { colors, css } from '~/styled';
import { IOrder, TOrderStatus } from '~/services/helpers/backend-models';
import { UITable, UIIcon, UILink, Container, UIButton } from '~/components/ui';
import { usePopupContext } from '~/contexts/popup/context';
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
const StyledPDFButton = styled(UIButton)``;
const commonIconStyle = css`
  cursor: pointer;
  margin: 0 8px;
`;
/* OrderListComponent Component  */
function OrderListComponent(props: React.PropsWithChildren<OrderListComponentProps>) {
  /* OrderListComponent Variables */
  const { t } = useTranslation();
  const popups = usePopupContext();
  /* OrderListComponent Callbacks */
  const handleEditClick = React.useCallback(
    item => {
      popups.updateOrder.show({ order: item });
    },
    [popups.updateOrder],
  );

  /* OrderListComponent Lifecycle  */

  return (
    <Container>
      {props.setCustomer && (
        <OrderListFilterComponent
          status={props.status}
          setStatus={props.setStatus}
          setCustomer={props.setCustomer}
          setLastDate={props.setDate}
        />
      )}
      <UITable
        id="orders-page-table"
        data={props.orders}
        onSortChange={e => props.setSortBy(e)}
        onSortTypeChange={value => props.setSortType(value)}
        rowCount={props.elementCountOfPage > 0 ? props.elementCountOfPage : 15}
        columns={[
          {
            title: t('order.code'),
            itemRenderer: item => item.id.slice(0, 10),
            itemSortName: 'id',
          },
          {
            title: t('common.customer'),
            itemRenderer: item => item.buyerName,
          },
          {
            title: t('order.order-date'),
            itemRenderer: item => item.orderDate,
          },
          {
            title: t('order.order-waybill-date'),
            itemRenderer: item => item.waybillDate,
          },
          {
            title: t('order.quantity'),
            itemRenderer: item => item.orderItems.length,
          },
          {
            title: t('order.status-text'),
            itemRenderer: item => ORDER_STATUS_MAP[item.status],
            itemSortName: 'status',
          },
          {
            title: t('common.total-price'),
            itemRenderer: item => `${item.totalPrice} TL`,
          },
          {
            title: null,
            itemRenderer: item => (
              <StyledActionsWrapper>
                {(item.status === 'CONFIRMED' || item.status === 'PREPARED') && (
                  <UIIcon
                    name="edit"
                    color={colors.primaryDark}
                    className={commonIconStyle}
                    size={16}
                    onClick={x => handleEditClick(item)}
                  />
                )}
                <StyledLink to={`/order/${item.id}`}>{t('common.details')}</StyledLink>
                {item.status === 'FINISHED' && (
                  <StyledPDFButton onClick={x => props.handlePdfBtnClick(item)}>Yazdir</StyledPDFButton>
                )}
              </StyledActionsWrapper>
            ),
          },
        ]}
      />
    </Container>
  );
}
const PureOrderListComponent = React.memo(OrderListComponent);

export { PureOrderListComponent as OrderListComponent };
