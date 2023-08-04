import * as ReactDOM from 'react-dom';

const PhotoPicker = ({ change }) => {
  const component = (
    <input type="file" hidden id="photo-picker" onChange={change} />
  );

  return ReactDOM.createPortal(
    component,
    document.getElementById('photo-picker-element')
  );
};

export default PhotoPicker;
