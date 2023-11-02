import PropTypes from 'prop-types';

export default function Title({ mainTitle }) {
    return <h1>{mainTitle}</h1>;
}

Title.propTypes = {
    mainTitle: PropTypes.string.isRequired,
};
