import PropTypes from 'prop-types';
import { Button } from './LoadMoreBtn.style';

export const ButtonLoadMore = ({ onClick }) => {
    return (
        <Button onClick={onClick}>
            Load more
        </Button>
    )
}

ButtonLoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};