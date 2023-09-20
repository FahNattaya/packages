#!/bin/bash

export TZ="Asia/Bangkok"

if [[ ! -z $JSON_CONFIG_PATH ]]; then
    echo "INFO  Start export env"
    while IFS=$'\t\n' read -r LINE; do
        export "${LINE}"
    done < <(
        jq <"${JSON_CONFIG_PATH}" \
            --compact-output \
            --raw-output \
            --monochrome-output \
            --from-file \
            <(echo 'to_entries | map("\(.key)=\(.value)") | .[]')
    )
    echo "INFO  End export env"
else
    echo "WARNING   JSON_CONFIG_PATH is not set"
fi

if [[ ! -z $CRONJOB_ARGUMENTS ]]; then
    echo "Cronjob command arguments are set"
    ARGUMENTS=$($CRONJOB_ARGUMENTS)
else
    echo "No cronjob arguments"
fi

if [[ ! -z $JS_INDEX_PATH ]]; then
    echo "INFO  Start node from $JS_INDEX_PATH"
    node --max-old-space-size=$MAX_OLD_SPACE_SIZE $JS_INDEX_PATH $ARGUMENTS
    echo "INFO  End node"
else
    echo "INFO  Start node from ./build/index.js"
    node --max-old-space-size=$MAX_OLD_SPACE_SIZE ./build/index.js $ARGUMENTS
    echo "INFO  End node"
fi
