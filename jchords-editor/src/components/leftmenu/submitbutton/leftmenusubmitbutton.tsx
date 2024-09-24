import { useState } from 'react';
import './leftmenusubmitbutton.css';

const enum LeftMenuSubmitButtonStatus {
  None,
  Loading,
  Created,
  Updated,
  Failed,
}

interface LeftMenuSubmitButtonProps {
  creatingSong: boolean;
  enabled: boolean;
  submit: () => Promise<void>;
}

export default function LeftMenuSubmitButton(props: LeftMenuSubmitButtonProps) {
  const [submitStatus, setSubmitStatus] = useState(LeftMenuSubmitButtonStatus.None);

  function submit() {
    if (!props.enabled) return;
    setSubmitStatus(LeftMenuSubmitButtonStatus.Loading);
    // to properly render the status
    setTimeout(
      () =>
        props
          .submit()
          .then(() => {
            setSubmitStatus(
              props.creatingSong
                ? LeftMenuSubmitButtonStatus.Created
                : LeftMenuSubmitButtonStatus.Updated,
            );
          })
          .catch(() => {
            setSubmitStatus(LeftMenuSubmitButtonStatus.Failed);
          }),
      50,
    );
  }

  return (
    <div>
      {submitStatus === LeftMenuSubmitButtonStatus.None ? (
        <></>
      ) : submitStatus === LeftMenuSubmitButtonStatus.Loading ? (
        <p>Working...</p>
      ) : submitStatus === LeftMenuSubmitButtonStatus.Created ? (
        <p className="left-menu-submit-msg-success">Successfully created new song!</p>
      ) : submitStatus === LeftMenuSubmitButtonStatus.Updated ? (
        <p className="left-menu-submit-msg-success">Successfully updated song!</p>
      ) : (
        <p className="left-menu-submit-msg-failure">Something went wrong</p>
      )}
      <button id="left-menu-submit-button" disabled={!props.enabled} onClick={submit}>
        {props.creatingSong ? 'CREATE SONG' : 'UPDATE SONG'}
      </button>
    </div>
  );
}
