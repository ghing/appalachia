What is Appalachia?
===================

TODO: Describe the ARC definition and where it comes from and how it might differ from other definitions of the region.


Technical details
-----------------

To re-generate the GeoJSON file, you'll need:

* A computer running Mac OS X or Linux
* wget
* [csvkit](https://github.com/wireservice/csvkit)

First, clone the git repository for this project:

    git clone https://github.com/ghing/appalachia.git

Change directory to the working copy of the project:

    cd appalachia

Run an npm script to download the source data, process it, and output the GeoJSON file:

    npm run build
