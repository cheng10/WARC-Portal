#!/bin/bash

# download google drive files to local, using thier file id
# prerequsite: gdirve(https://github.com/prasmussen/gdrive)

declare -a f_ids=(  "0B24ccG2uRT4sN2hFUF9mM1lINm8"
                    "0B24ccG2uRT4sTTV5OXFrN3RDMnc"
                    "0B24ccG2uRT4sX0laR3Jic2ZUMUE"
                    "0B24ccG2uRT4sQUU5R20wdkFsT3M"
                    "0B24ccG2uRT4sTkFEVGZPSzM0V3M"
                    "0B24ccG2uRT4sdkc2c2ZCcFhPOTQ"
                    "0B24ccG2uRT4sU0RpQVJhUkhWOFk"
                    "0B24ccG2uRT4sMUNXWk1HVzNxaGM"
                    "0B24ccG2uRT4sVkxaY0RwVW1SOHc"
                    )

for id in "${f_ids[@]}"
do
    echo "file no: $id"
    gdrive download $id
done

