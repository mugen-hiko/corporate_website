activate :directory_indexes

activate :external_pipeline,
  name: :gulp,
  command: environment?(:development) \
    ? 'cd ../ && npm run assets -- --development' \
    : 'cd ../ && npm run assets',
  source: '.tmp'

ignore /\.swp\z/

[:xml, :json, :txt].each do |ext|
  page '/*.' + ext.to_s, layout: false
end

page '/404.html', directory_index: false

['_headers'].each do |file|
  import_file File.expand_path(file, app.source_dir), '/' + file
end

configure :development do
  config[:host] = 'http://localhost:3000/'

  config[:slim] = {
    pretty: true,
    sort_attrs: false,
    format: :html
  }

  config[:builder] = {
    indent: 2
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

  config[:builder] = {
    indent: 0
  }
end
