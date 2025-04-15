import Dialog from 'shared/enums/dialog';
import DialogManifest from 'shared/types/dialogmanifest';
import OpenSongDialog from 'src/components/dialogs/opensongdialog';

const dialogManifest: DialogManifest = [
  {
    type: Dialog.OpenSong,
    component: OpenSongDialog,
  },
];

export default dialogManifest;
