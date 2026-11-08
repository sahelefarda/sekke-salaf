export default {

  async fetch(request) {

    try {

      const result = {
        success: true
      };

      /*
      بورس کالا
      */

      try {

        const imeResponse =
          await fetch(
            "https://cdn.ime.co.ir/getFinancialMarketData?param=gavahi",
            {
              headers: {
                "User-Agent": "Mozilla/5.0"
              }
            }
          );

        const imeData =
          await imeResponse.json();

        const goldCoin =
          imeData.find(
            x =>
            x.ContractCode === "GoldCoin" ||
            x.Symbol === "GoldCoin"
          );

        if (goldCoin) {

          result.goldPrice =
            goldCoin.LastPrice ||
            goldCoin.FinalPrice ||
            goldCoin.YesterdayPrice ||
            null;

        }

      } catch (e) {

        result.goldPrice = null;

      }

      /*
      فعلاً عسکه2 دستی
      */

      result.bondPrice = null;

      return new Response(
        JSON.stringify(result),
        {
          headers: {
            "Content-Type":
              "application/json;charset=utf-8",

            "Access-Control-Allow-Origin":
              "*",

            "Cache-Control":
              "no-cache"
          }
        }
      );

    }
    catch (error) {

      return new Response(
        JSON.stringify({
          success: false,
          error: error.message
        }),
        {
          status: 500,
          headers: {
            "Content-Type":
              "application/json;charset=utf-8",

            "Access-Control-Allow-Origin":
              "*"
          }
        }
      );

    }

  }

};
