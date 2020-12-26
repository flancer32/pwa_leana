# Backup

## DB

```shell
live@vmi384293:~$ crontab -l
...
16 2 * * * /usr/bin/bash /home/live/inst/leana/bin/service/backup/db.sh > /tmp/cron_live_backup_db.log
```
