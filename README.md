# equinix
equinix product catalog

Home page of the application is http://localhost:3000/productCatalog.html

Dir Structure :

'pages' directory contains the html, js and css files .

'app.js' is the starting point, where routes for Product catalogue's rest API are defined . 

The Rest APIs :

Method  ,    URI                     Parameters                                       Response
-------------------------------------------------------------------------------------------------------------------
Get     ,  '/product'            , 'term=Apple '                              [
                                                                                {
                                                                                    "productId": "1234",
                                                                                    "productName": "DEllLatitude",
                                                                                    "costPrice": "2131",
                                                                                    "sellingPrice": "6778",
                                                                                    "quantity": "20"
                                                                                },..
                                                                                 ...
                                                                                 ..
                                                                              ]     
-------------------------------------------------------------------------------------------------------------------
Get     ,  '/productDetail'      , 'productId=123'                            {
                                                                                    "productId": "1234",
                                                                                    "productName": "DEllLatitude",
                                                                                    "costPrice": "2131",
                                                                                    "sellingPrice": "6778",
                                                                                    "quantity": "20"
                                                                               }
-------------------------------------------------------------------------------------------------------------------
Post     ,  '/createProduct'    , {                                               "Product added !! "
                                       "productId": "1234",
                                       "productName": "DEll Latitude E77440",
                                       "costPrice": "2131",
                                       "sellingPrice": "6778",
                                       "quantity": "20"
                                  }
                                  
-------------------------------------------------------------------------------------------------------------------
Post     ,  '/updateProduct'    , {                                               "Product Details Saved !! "
                                       "productId": "1234",
                                       "productName": "DEll Latitude E77440",
                                       "costPrice": "2131",
                                       "sellingPrice": "6778",
                                       "quantity": "20"
                                  }
                                  -------------------------------------------------------------------------------------------------------------------
