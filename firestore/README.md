To export the current prod dataset for test data:
 1. Go to the firestore database on google cloud, and export to a cloud bucket
 2. Use the gcloud cli to download the data locally. Something like:
    ```shell
    gcloud storage cp --recursive gs://<BUCKET_NAME>/<FOLDER_NAME> .
    ```
 3. Turn off the emulator, move to correct files to `firestore/testdata/firestore_export`, then turn the emulator on again 
