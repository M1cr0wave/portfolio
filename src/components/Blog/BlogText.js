import './BlogText.css';

export default function BlogText() {
  return (
    <div className="blog-text">
      <p>
        <span className="drop-cap font-serif" aria-hidden="true">
          T
        </span>
        he two most common attack vectors dealing with web caches are web cache poisoning and web
        cache deception. I was introduced to this by{' '}
        <a
          href="https://www.shockwave.cloud/blog/shockwave-works-with-openai-to-fix-critical-chatgpt-vulnerability"
          className="editorial-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nagali
        </a>{' '}
        when he found the ChatGTP bug and then a really clever path based cache by{' '}
        <a
          href="https://nokline.github.io/bugbounty/2024/02/04/ChatGPT-ATO.html"
          className="editorial-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Harel Security Research
        </a>
        . Please read them after this, since I will be going indepth over the root cause of the bug.
      </p>
      <h3 className="subheading font-serif">
        How is Cache Deception different from Cache Poisoning ?
      </h3>
      <p>
        Before we do a deep dive into Web Cache Deception, let&apos;s first understand the
        difference between Cache Deception and Cache Poisoning.
      </p>
      <p>
        Cache poisoning occurs when an attacker puts malicious things into the cache and when the
        victim opens that URL they are attacked, while cache deception is when you force the victim
        to store sensitive information in the cache and this is later read by the attacker.
      </p>
    </div>
  );
}
