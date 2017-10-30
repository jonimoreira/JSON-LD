#! /bin/bash
trap "pkill -P $$; kill -INT $$" INT

while read n
do
    "$@" &
done < <(seq 5)
wait

