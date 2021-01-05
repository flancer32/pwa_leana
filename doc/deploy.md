# Deploy

## Setup files to clone

Copy `./bin/deploy/clone.sh` script into the root of installation directory:

```shell
$ pwd
/home/live/inst/leana
$ cat > ./clone.sh
...
```

Create local configuration files from templates in the installation root:

* `./cfg/init.json` => `./local.json`
* `./cfg/init.sh` => `./local.sh`

then edit local configuration:

```shell
$ nano local.json
$ nano local.sh
```

## Launch clone script and build app

Launch `./clone.sh` to clone and install the application then create link to fresh instance:

```shell
$ unlink live && ln -s leana_20210105 live
```

Expected content of the installation root:

```shell
live@vmi384293:~/inst/leana$ ls -lh
total 16K
-rwxrwxr-x 1 live live  305 Jan  5 16:46 clone.sh
drwxrwxr-x 9 live live 4.0K Jan  5 16:47 leana_20210105
lrwxrwxrwx 1 live live   14 Jan  5 15:43 live -> leana_20210105
-rw-rw-r-- 1 live live  591 Jan  5 15:40 local.json
-rwxrwxr-x 1 live live  409 Jan  5 15:40 local.sh
```

## Install PWA as service

```shell
# systemctl link /home/live/inst/leana/live/bin/pwa-leana.service 
Created symlink /etc/systemd/system/pwa-leana.service → /home/live/inst/leana/live/bin/pwa-leana.service.
# systemctl daemon-reload   # optional
# systemctl list-units --type=service   # to list all services
```

Enable auto start for the service on the server boot:

```shell
# systemctl enable pwa-leana
Created symlink /etc/systemd/system/multi-user.target.wants/pwa-leana.service → /home/live/inst/leana/live/bin/pwa-leana.service.
```

## Post-install routines

```shell
$ cd ~/inst/leana/
$ unlink live && ln -s leana_YYYYMMDD live
```

Update `systemctl` and re-run service `pwa-leana` (as `root` user):

```shell
# systemctl daemon-reload
# service pwa-leana stop
# service pwa-leana start
```
