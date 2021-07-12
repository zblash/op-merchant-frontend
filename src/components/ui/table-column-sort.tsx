import * as React from 'react';
import styled, { colors, css } from '@/styled';
import { UIIcon } from '.';
import { useStateFromProp } from '@/utils/hooks';

/* TableColumnSortComponent Helpers */
interface TableColumnSortComponentProps {
  onSortChange: (item: string, sortType: string) => void;
  item: string;
  title: string | React.ReactElement;
  sortType: string;
}

/* TableColumnSortComponent Constants */

/* TableColumnSortComponent Styles */
const StyledSortBtn = styled.div`
  color: ${colors.white};
  height: 50px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const iconStyle = css`
  margin-left: 5px;
`;
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
    <StyledSortBtn onClick={() => setSortType(prevState => (prevState === 'asc' ? 'desc' : 'asc'))}>
      {props.title}
      <UIIcon className={iconStyle} name={sortType === 'asc' ? 'upArrow' : 'downArrow'} size={13} />
    </StyledSortBtn>
  );
}
const PureTableColumnSortComponent = React.memo(TableColumnSortComponent);

export { PureTableColumnSortComponent as TableColumnSortComponent };
