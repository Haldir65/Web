var path = require("path");

module.exports = {
    entry: './app.js',
    output: {
        filename: "./bundle.js"
    },
   
    watch: true,
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {   test: /\.hbs$/, 
                loader: "handlebars-loader"
            },
            // stylus configs >>>
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          'stylus-loader'
        ]
      }
     // <<< stylus configs
        ]
    }
}