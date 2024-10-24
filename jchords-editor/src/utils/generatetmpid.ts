// returns temporary song id of the form 'tmpXXXXXXXXXX'
// NOTE: only for temporary use for songs that aren't stored in the database.
const generateTmpId = () =>
  `tmp${Math.floor(Math.random() * 10_000_000_000)
    .toString()
    .padStart(10, '0')}`;

export default generateTmpId;
