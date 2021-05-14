module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        statemachine: './src/index.js'
    },
    output: {
        path: __dirname+"/dist",
        filename: '[name].js'
    },
    module: {
        rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/preset-env', '@babel/preset-react' ],
                        plugins: [ '@babel/plugin-proposal-class-properties' ]
                    },
                }
             ]
          },
         {
             test: /\.css$/,
             exclude: /node_modules/,
             use: [
                 "style-loader",
                 {
                     loader: "css-loader",
                     options: { url: false }
                 }
             ]
          }
       ]
   }
};
