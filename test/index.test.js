'use strict';

let MarkdownIt = require('markdown-it');
let syndromicaMarkdownEmojiPlugin = require('../');
let md = new MarkdownIt();

md.use(syndromicaMarkdownEmojiPlugin);

describe('syndromica-markdown-emoji', () => {
  it('renders text emoji (:smile:) from s3', function () {
    let result = md.render('foo :smile: bar');

    expect(result).to.contain('foo <img class="syndromica-emoji" style="height: 1.5em; width: 1.5em" src="https://s3.amazonaws.com/syndromica-assets/cdn/emoji/smile.png" alt="smile"> bar');
  });

  it('renders unicode emoji from s3', function () {
    let result = md.render('foo 👍 bar');

    expect(result).to.contain('foo <img class="syndromica-emoji" style="height: 1.5em; width: 1.5em" src="https://s3.amazonaws.com/syndromica-assets/cdn/emoji/thumbsup.png" alt="thumbsup"> bar');
  });

  it('does not render shortcut emoji', function () {
    let result = md.render('foo :) bar');

    expect(result).to.contain('foo :) bar');
  });

  it('does not render emoji shortcuts in hyperlink', function () {
    let result = md.render('text http://example.com/foo:Preferences text');

    expect(result).to.contain('text http://example.com/foo:Preferences text');
  });

  it('renders melior emoji', function () {
    let result = md.render('foo :melior: bar');

    expect(result).to.contain('foo <img class="syndromica-emoji" style="height: 1.5em; width: 1.5em" src="https://s3.amazonaws.com/syndromica-assets/cdn/emoji/melior.png" alt="melior"> bar');
  });
});
