xml.instruct!
xml.urlset(xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9') do
  sitemap.resources
    .select{|resource| resource.ext == '.html'}
    .select{|resource| resource.page_id != '404'}
    .each do |resource|
      xml.url do
        xml.loc(
          full_url(resource.page_id)
        )
      end
    end
end
