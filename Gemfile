source "https://rubygems.org"

gem "jekyll", "~> 4.4"

# jekyll-sass-converter 3.x requires sass-embedded >= 1.75 which breaks on macOS 13.
# Pin to 2.x which uses sassc instead of sass-embedded.
gem "jekyll-sass-converter", "~> 2.0"

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
  gem "jekyll-minifier"
end

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
gem "uglifier"
