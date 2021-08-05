import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { IObligationTotals } from '@/services/helpers/backend-models';
import { Row, Col } from 'react-bootstrap';
import { UILink } from '@/components/ui';

/* ObligationComponent Helpers */
interface ObligationComponentProps {
  obligation: IObligationTotals;
}

/* ObligationComponent Component  */
function ObligationComponent(props: React.PropsWithChildren<ObligationComponentProps>) {
  /* ObligationComponent Variables */
  const { t } = useTranslation();

  /* ObligationComponent Callbacks */

  /* ObligationComponent Lifecycle  */

  return (
    <Row className="border p-4">
      <Col lg={12} md={12} sm={12} xl={12} xs={12} className="border-bottom p-2 mb-2 d-flex justify-content-between">
        <h3 className="font-size-19-bold">Hesap Ozeti</h3>
        <UILink className="text-underline" to="/obligation-activities">
          {t('common.details')}
        </UILink>
      </Col>
      <Col
        lg={12}
        md={12}
        sm={12}
        xl={12}
        xs={12}
        className="d-flex justify-content-between pb-3 align-items-center px-2"
      >
        <h4 className="font-size-19">{t('obligations.totalDebts')}</h4>
        <span className="border px-3 py-2">{props.obligation.debt.toFixed(2)} &#8378;</span>
      </Col>
      <Col lg={12} md={12} sm={12} xl={12} xs={12} className="d-flex justify-content-between align-items-center px-2">
        <h4 className="font-size-19">{t('obligations.totalReceivables')}</h4>
        <span className="border px-3 py-2">{props.obligation.receivable.toFixed(2)} &#8378;</span>
      </Col>
    </Row>
  );
}
const PureObligationComponent = React.memo(ObligationComponent);

export { PureObligationComponent as ObligationComponent };
