module ApplicationHelpers
  #
  # Padrino::Helpersへアクセスするための代理クラス
  #
  class PadrinoHelpersSurrogate
    include Padrino::Helpers
  end

  private

  #
  # PadrinoHelpersSurrogateインスタンス
  #
  def padrino_helpers_surrogate
    @padrino_helpers_surrogate ||= PadrinoHelpersSurrogate.new
  end

  #
  # @override: Padrino::Helpers::TagHelpers#tag
  #
  # 閉じスラッシュ無しのHTMLタグを出力
  #
  def tag(name, options = nil, open = true)
    padrino_helpers_surrogate.tag(name, options, open)
  end

  #
  # ArrayをHTML class形式で連結
  #
  def html_class(*items)
    {
      class: items.join(' ')
    }
  end

  #
  # `page_id` に相当するページを返す
  #
  def find_page(page_id)
    sitemap.find_resource_by_page_id(page_id)
  end

  #
  # `page_id` に相当するパスを返す
  #
  def find_path(page_id)
    '/' + find_page(page_id).path
  end

  #
  # `page_id` に相当するページのタイトルを返す
  #
  def find_title(page_id)
    find_page(page_id).data.title
  end

  #
  # フルURIを返す
  #
  def full_url(resource = nil, path: false, prefixed: false)
    items = [config[:host]]

    if path
      items << config[:http_prefix] unless prefixed
      items << resource
    else
      items << (resource ? find_page(resource).url : current_page.url)
    end

    File.join(*items)
  end

  #
  # タイトルを組み立て
  #
  def title(page_id = nil)
    items = []

    if page_id
      items << find_title(page_id) unless page_id.to_sym == :index
    else
      items << current_page.data.title unless current_page?(:index)
    end

    items << data.site.title

    items.compact.join(' | ')
  end

  #
  # 指定のパスが現在のページか判定
  #
  def current_page?(page_id)
    current_page.page_id == page_id.to_s
  end
end
