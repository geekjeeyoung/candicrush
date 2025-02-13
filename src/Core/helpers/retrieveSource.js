import {Platform} from 'react-native';

exports.extractSourceFromFile = (file) => {
  console.log(file);
  const mime = file.mime || file.type;
  const source = file.path || file.uri;
  const uploadUri =
    Platform.OS === 'ios' ? source.replace('file://', '') : source;
  const filename =
    new Date() + '-' + source.substring(source.lastIndexOf('/') + 1);

  return {filename, source, uploadUri, mime};
};
