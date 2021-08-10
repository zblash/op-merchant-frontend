import * as React from 'react';
import { UIDownChevronIcon, UIChevronUpIcon } from '@/components/ui';
import { useStateFromProp } from '@/utils/hooks';
import { Button } from 'react-bootstrap';

/* TableColumnSortComponent Helpers */
interface TableColumnSortComponentProps {
  onSortChange: (item: string, sortType: string) => void;
  item: string;
  title: string | React.ReactElement;
  sortType: 'asc' | 'desc';
}

/* TableColumnSortComponent Constants */

/* TableColumnSortComponent Styles */

/* TableColumnSortComponent Component  */
function TableColumnSortComponent(props: React.PropsWithChildren<TableColumnSortComponentProps>) {
  /* TableColumnSortComponent Variables */
  const firstRender = React.useRef(true);
  const [sortType, setSortType] = useStateFromProp(props.sortType);
  /* TableColumnSortComponent Callbacks */

  /* TableColumnSortComponent Lifecycle  */
  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      props.onSortChange(props.item, sortType);
    }
  }, [sortType]); //eslint-disable-line

  return (
    <div className="w-100 justify-content-center d-flex">
      <Button
        className="d-flex justify-content-between align-items-center"
        variant="link"
        onClick={() => setSortType(prevState => (prevState === 'asc' ? 'desc' : 'asc'))}
      >
        <span className="pr-1">{props.title}</span>
        {sortType === 'asc' ? <UIChevronUpIcon /> : <UIDownChevronIcon />}
      </Button>
    </div>
  );
}
const PureTableColumnSortComponent = React.memo(TableColumnSortComponent);

export { PureTableColumnSortComponent as TableColumnSortComponent };
