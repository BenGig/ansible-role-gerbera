# Ansible role: gerbera

Configure instances of the Gerbera UPnP server.

Gerbera is versatile UPnP media server with extensively configurable import and classification capabilities.

Development: https://github.com/gerbera/gerbera
Documentation: http://docs.gerbera.io/

## Requirements

None.

## Role Variables

All 'yes'/'no' options have to be strings and surrounded by apostrophes, to avoid Ansible changing them to True or False.

All variables and their defaults

    upnp_library_name: Gerbera Library

A friendly name for display in the renderer devices.

    ui_enabled: 'yes'

UI is activated.

    accounts_enabled: true

Use a password restricted account to access the UI.

    gerbera_password: <no default>

By default, the UI and a password restricted access is configured. You need to set the password, or the role will fail.

    gerbera_user: gerbera

User name for the UI access.

    gerbera_port: 49153

Port for the UI. Note, that because of the implementation in the UPnP SDK only ports above 49152 are supported.

    uuid: deb6bdc2-ac9f-4ada-bc61-ce9f4628b35a

UPnP devices must use unique UUIDs. Usually, Gerbera creates a new UUID after a fresh installation. With this module, supply a UUID for every instance (can be ignored if only one instance will be running).

    gerbera_home: /var/lib/gerbera

Storage location for instance dependent files (ie. sqlite3 database). Use separate directories for multiple instances.

    gerbera_webhome: /usr/share/gerbera/web

Usually shared amongst instances. Change if you want to tinker about with the appearance of the UI. This directory will not be maintained by this module!

    mysql_host: ""

By default, a local sqlite3 database is used this host name is empty. An external mysql/mariadb server may be used. In this case, configure also:

    mysql_user: gerbera
    mysql_database: gerbera
    mysql_password: <no default>
    
You must configure the manatory password, or the role will raise an error.

    navigation_type: enhanced

Configure the creation of the virtual directory structure. Possible options are

 - `builtin`: a simple structure based on artist, genres and albums. Good for standard media players on PCs etc.
 - `enhanced`: designed for small screen devices, creating alphabetic hierarchies.
 - `custom`: add your own script (see the included `import_structured.js` for an example).
 - `disabled`: no navigation will be created.

    navigation_custom_script: ""

If `navigation_type` is `custom`, enter the (server side) path here. You have to take care of the installation of a custom script.

    autoscan_useinotify: auto

Use inotify if possible. Will update the database whenever a file is added, removed or changed. Other options are `'yes'` or `'no'` to force or disable this feature.

    autoscan_directory: /audio

Preconfigure a directory to be scanned. More directories can be added in the UI.

    ffmpegthumbnailer: false

Use thumbnail generation for videos.

    ffmpegthumbnailer_size: 128

Thumbnail size (width and height). The thumbnail size should not exceed 160x160 pixels, higher values can be used but will mostprobably not be supported by DLNA devices.

    ffmpegthumbnailer_seekpercentage: 5

How far to seek forward in a movie to take a thumbnail.

    ffmpegthumbnailer_filmstripoverlay: 'yes'

Creates a filmstrip like border around the image, turn this option off if you want pure images.

    ffmpegthumbnailer_workaround: 'no'

Enable workarounds for older versions of ffmpeg. Enable if you experience problems like crashes during thumbnail generation.

    markplayed: 'no'

Mark your watched videos with a prefix.

    markplayed_prepend: '*'

Marker for played videos.

    ps3_support: false

Workarounds for PS3.

    dsm_support: false

Workarounds for D-Link DSM / ZyXEL DMA-1000.

    tg100_support: false

Workarounds for Telegent TG100.

Dependencies
------------

None.

Example Playbook
----------------

Including an example of how to use your role (for instance, with variables passed in as parameters) is always nice for users too:

    - hosts: servers
      roles:
         - { role: username.rolename, x: 42 }

License
-------

BSD

Author Information
------------------

An optional section for the role authors to include contact information, or a website (HTML is not allowed).
