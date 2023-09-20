
describe('Stock Reducer', () => {
  it('should handle loadStockDataOtherSuccess', () => {
 
    const mockDataStock2:any = [
        {
          "locationCode": "1101",
          "locationName": "สาขา Flag Ship เซ็นทรัลเวิลด์",
          "productStock": [
            {
              "brand": "APPLE",
              "model": "IPHONE5S 32GB",
              "productName": "APPLE IPHONE5S 32GB",
              "productType": "DEVICE",
              "productSubType": "HANDSET",
              "company": "AWN",
              "totalStockAval": 50,
              "colorStock": [
                {
                  "color": "GOLD",
                  "stockAval": 1
                },
                {
                  "color": "SILVER",
                  "stockAval": 25
                },
                {
                  "color": "SPACE GRAY",
                  "stockAval": 24
                }
              ]
            }
          ]
        },
        {
          "locationCode": "1103",
          "locationName": "สาขาเซ็นทรัลซิตี้บางนา",
          "productStock": [
            {
              "brand": "APPLE",
              "model": "IPHONE5S 32GB",
              "productName": "APPLE IPHONE5S 32GB",
              "productType": "DEVICE",
              "productSubType": "HANDSET",
              "company": "AWN",
              "totalStockAval": 40,
              "colorStock": [
                {
                  "color": "GOLD",
                  "stockAval": 6
                },
                {
                  "color": "SILVER",
                  "stockAval": 15
                },
                {
                  "color": "SPACE GRAY",
                  "stockAval": 19
                }
              ]
            }
          ]
        },
        {
          "locationCode": "1107",
          "locationName": "สาขาแฟชั่นไอร์แลนด์",
          "productStock": [
            {
              "brand": "APPLE",
              "model": "IPHONE5S 32GB",
              "productName": "APPLE IPHONE5S 32GB",
              "productType": "DEVICE",
              "productSubType": "HANDSET",
              "company": "AWN",
              "totalStockAval": 2,
              "colorStock": [
                {
                  "color": "SILVER",
                  "stockAval": 1
                },
                {
                  "color": "SPACE GRAY",
                  "stockAval": 1
                }
              ]
            }
          ]
        },
        {
          "locationCode": "1137",
          "locationName": "สาขาอาคารเอไอเอส 1",
          "productStock": [
            {
              "brand": "APPLE",
              "model": "IPHONE5S 32GB",
              "productName": "APPLE IPHONE5S 32GB",
              "productType": "DEVICE",
              "productSubType": "HANDSET",
              "company": "AWN",
              "totalStockAval": 12,
              "colorStock": [
                {
                  "color": "SILVER",
                  "stockAval": 5
                },
                {
                  "color": "SPACE GRAY",
                  "stockAval": 7
                }
              ]
            }
          ]
        }
      ];
 


    expect(mockDataStock2).toEqual(mockDataStock2); 

  });

});
