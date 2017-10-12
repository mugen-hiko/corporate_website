activate :directory_indexes

activate :external_pipeline,
  name: :gulp,
  command: environment?(:development) \
    ? 'cd ../ && npm run assets -- --development' \
    : 'cd ../ && npm run assets',
  source: '.tmp'

ignore /\.swp\z/

page '/*.xml',  layout: false
page '/*.json', layout: false
page '/*.txt',  layout: false

page '/404.html', directory_index: false

configure :development do
  config[:host] = 'http://localhost:3000/'

  config[:slim] = {
    pretty: true,
    sort_attrs: false,
    format: :html
  }
end

configure :production do
  activate :asset_hash,
    ignore: [
      %r|\A[^/]+\z|
    ]

  #activate :asset_host, host: '//YOURDOMAIN.cloudfront.net'

  config[:host] = 'https://www.mugen-hiko.co.jp/'

  config[:slim] = {
    pretty: false,
    sort_attrs: false,
    format: :html
  }
end
