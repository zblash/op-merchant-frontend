import * as React from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { IObligationTotals } from '@/services/helpers/backend-models';
import { Row, Col, Button } from 'react-bootstrap';

/* ObligationComponent Helpers */
interface ObligationComponentProps {
  obligation: IObligationTotals;
}

/* ObligationComponent Component  */
function ObligationComponent(props: React.PropsWithChildren<ObligationComponentProps>) {
  /* ObligationComponent Variables */
  const { t } = useTranslation();
  const routerHistory = useHistory();

  /* ObligationComponent Callbacks */

  /* ObligationComponent Lifecycle  */

  return (
    <Row className="border rounded p-2">
      <Col lg={12} md={12} sm={12} xl={12} xs={12} className="border-bottom p-2 mb-2 d-flex justify-content-between">
        <h3>Hesap Ozeti</h3>
      </Col>
      <Col className="mb-2 d-flex justify-content-between" lg={12} md={12} sm={12} xl={12} xs={12}>
        <div className="w-45 float-left border rounded d-flex align-items-center flex-column">
          <h4>{t('obligations.totalDebts')}</h4>
          <span>{props.obligation.debt.toFixed(2)} &#8378;</span>
        </div>
        <div className="w-45 float-left border rounded d-flex align-items-center flex-column">
          <h4>{t('obligations.totalReceivables')}</h4>
          <span>{props.obligation.receivable.toFixed(2)} &#8378;</span>
        </div>
      </Col>
      <Col lg={12} md={12} sm={12} xl={12} xs={12}>
        <Button className="float-right" onClick={() => routerHistory.push('/obligation-activities')}>
          {t('common.details')}
        </Button>
      </Col>
    </Row>
  );
}
const PureObligationComponent = React.memo(ObligationComponent);

export { PureObligationComponent as ObligationComponent };
