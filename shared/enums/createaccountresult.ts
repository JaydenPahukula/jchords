const enum CreateAccountResult {
  Success,
  WeakPassword,
  InvalidEmail,
  EmailInUse,
  Failed,
}

export default CreateAccountResult;
