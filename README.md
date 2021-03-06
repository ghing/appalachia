What is Appalachia?
===================

TODO: Describe the ARC definition and where it comes from and how it might differ from other definitions of the region.

Spatial files
-------------

This package contains GeoJSON files useful for topical mapping.

### Counties

- `counties.geojson`

### Congressional districts (114th congress district boundaries)

- `appalachia-congressional-districts-114.geojson`

Node interface
--------------

This is really quickly written, not particularly performant, and hasn't been tested to work in the browser via Browserify.  It's mostly useful as a convenience in other data processing scripts.

### Check whether a congressional district is in Appalachia

    var appalachia = require('appalachia');
    var districtInAppalachia = appalachia.districtInAppalachia; 

    districtInAppalachia('MD', 8); 

Technical details
-----------------

To re-generate the GeoJSON file, you'll need:

- A computer running Mac OS X or Linux
- Node.js
- wget
- [csvkit](https://github.com/wireservice/csvkit)

First, clone the git repository for this project:

    git clone https://github.com/ghing/appalachia.git

Change directory to the working copy of the project:

    cd appalachia

Install Node.js developer dependencies:

    npm install --dev

Run an npm script to download the source data, process it, and output the GeoJSON file:

    npm run build

### Installing system libraries

On some systems, you may have to install underlying libraries to build some of the Node dependencies.

For example, I've had to install Development files for International Components for Unicode:

```
sudo apt-get install libicu-dev
```

I've also had to install Geospatial Data Abstraction Library - Development files:

```
sudo apt-get install libgdal-dev
```

TODO: Document commands needed to install these libraries with Homebrew.

Data sources
------------

- Appalachia Subregions
  - URL: https://web.archive.org/web/*/http://www.arc.gov/assets/maps/related/Subregions_2009_Data.xls
  - Agency: Appalachian Regional Commission