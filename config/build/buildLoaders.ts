import { ModuleOptions } from 'webpack';
import { BuildOptions } from './types/types';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { buildBabelLoader } from './babel/buildBabelLoader';


export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const useCssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: { localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]' },
    }
  };

  const cssLoader = {
    test: /\.css$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      useCssLoaderWithModules,
    ]
  };

  // for next.js use swc-loader, works faster then babel

  const tsLoader = {  // ts loader can work with tsx jsx 
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: true
        }
      }
    ]
  };

  const babelLoader = buildBabelLoader(options);

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [{ loader: '@svgr/webpack', options: { icon: true } }],
  };

  return [
    cssLoader,
    // tsLoader,
    babelLoader,
    assetLoader,
    svgrLoader]
}