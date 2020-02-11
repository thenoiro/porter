!function(e,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define([],o):"object"==typeof exports?exports.bummer=o():e.bummer=o()}("undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:Function("return this")(),(function(){return function(e){var o={};function t(n){if(o[n])return o[n].exports;var r=o[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,o){if(1&o&&(e=t(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var r in e)t.d(n,r,function(o){return e[o]}.bind(null,r));return n},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},t.p="",t(t.s=0)}([function(e,o,t){const n=t(1),r=window.document.getElementById("md-container"),{hljs:s}=window;r.innerHTML=n,s&&s.initHighlightingOnLoad()},function(e,o){e.exports='<h1 id="bummer-is-a-small-script-that-helps-easily-and-safely-get-set-remove-replace-or-check-an-objects-properties-located-at-any-depth"><a href="https://github.com/thenoiro/bummer">BUMMER</a> is a small script that helps easily and safely get, set, remove, replace or check an object&#39;s properties located at any depth.</h1>\n<pre><code class="language-js">const bummer = require(&#39;bummer&#39;);\nconst settings = require(&#39;./widget&#39;).settings();\n\n// let axisFormat;\n// if (settings.yAxis &amp;&amp; settings.yAxis[0] &amp;&amp; settings.yAxis[0].labels) {\n//   axisFormat = settings.yAxis[0].labels.format;\n// }\nconst axisFormat = bummer(settings).get(&#39;yAxis[0].labels.format&#39;).val();\n\nif (axisFormat) {\n  /*\n    &#39;settings.yAxis[1]&#39; object may exist, or may not. Bummer script\n    will create this path automaticaly.\n  */\n  bummer(settings).set(&#39;yAxis[1].labels.format&#39;, axisFormat);\n}</code></pre>\n<hr>\n<h2 id="usage">Usage:</h2>\n<ul>\n<li><p><a href="#bummerget"><strong><code>bummer.get()</code></strong></a> - allows safely get a value from an object.</p>\n</li>\n<li><p><a href="#bummerset"><strong><code>bummer.set()</code></strong></a> - allows to set a value.</p>\n</li>\n<li><p><a href="#bummercheck"><strong><code>bummer.check()</code></strong></a> - checks is a property exist or not.</p>\n</li>\n<li><p><a href="#bummerremove"><strong><code>bummer.remove()</code></strong></a> - allows to delete a property from an object.</p>\n</li>\n<li><p><a href="#bummerreplace"><strong><code>bummer.replace()</code></strong></a> - allows to set up a new property, and returns an old one.</p>\n</li>\n</ul>\n<p>All these methods take two identical arguments first: <a href="#subject"><strong><code>subject</code></strong></a> and <a href="#path"><strong><code>path</code></strong></a>, and always returns <a href="#bummer_result"><strong><code>bummer_result</code></strong></a> object.</p>\n<h3 id="caching">Caching:</h3>\n<p><strong><code>bummer</code></strong> object is a function itself. It allows you to cache first argument, and only then call other methods. In this case you have to pass all the same arguments, but without first one. For example:</p>\n<pre><code class="language-js">// const name = bummer.get(data, &#39;user.meta.name&#39;).val();\n// const phone = bummer.get(data, &#39;user.meta.phone[0]&#39;).val();\nconst settings = bummer(data);\nconst name = settings.get(&#39;user.meta.name&#39;).val();\nconst phone = settngs.get(&#39;user.meta.phone[0]&#39;).val();</code></pre>\n<hr>\n<h3 id="bummerget"><code>bummer.get()</code></h3>\n<p><em><strong><code>bummer.get(</code></strong></em> <a href="#subject"><em><strong><code>subject,</code></strong></em></a> <a href="#path"><em><strong><code>path</code></strong></em></a> <em><strong><code>)</code></strong></em></p>\n<p>Gets a value according to the given <em><code>path</code></em>.</p>\n<p><em><strong>Returns</strong></em> a <a href="#bummer_result"><em><code>bummer_result</code></em></a> object, where:</p>\n<ul>\n<li><p><em><strong><code>.value</code></strong></em> - A value placed by the given <em><code>path</code></em>. In case no <em><code>path</code></em> argument is provided, or in case the value doesn&#39;t exist (or equals to <em><code>undefined</code></em>) this field will be equal to <em><code>undefined</code></em> too.</p>\n</li>\n<li><p><em><strong><code>.done</code></strong></em> equals <em><code>true</code></em> in case the <em><code>path</code></em> fully exist. Otherwise, it equals <em><code>false</code></em>.</p>\n</li>\n</ul>\n<h4 id="example">Example:</h4>\n<pre><code class="language-js">const sub = {\n  user: {\n    name: &#39;Guest&#39;,\n    age: undefined,\n  },\n};\nconst name = bummer.get(sub, &#39;user.name&#39;);\nconst age = bummer.get(sub, &#39;user.age&#39;);\nconst phone = bummer.get(sub, &#39;user.meta.phone&#39;);\n\nif (name.done) {\n  console.log(name.val()); // &gt; Guest\n}\nif (age.done) {\n  console.log(name.val()); // &gt; undefined\n}\nif (phone.done) {\n  // Will never run because of phone.done === false\n  console.log(phone.val()); // &gt; undefined\n}</code></pre>\n<hr>\n<h3 id="bummerset"><code>bummer.set()</code></h3>\n<p><em><strong><code>bummer.set(</code></strong></em> <a href="#subject"><em><strong><code>subject,</code></strong></em></a> <a href="#path"><em><strong><code>path,</code></strong></em></a> <em><strong><code>value [, force ]</code></strong></em> <em><strong><code>)</code></strong></em></p>\n<ul>\n<li><p><em><strong><code>value&lt;any&gt;</code></strong></em> - Value you want to set.</p>\n</li>\n<li><p><em><strong><code>force&lt;boolean&gt;</code></strong></em> - Optional. <em><code>true</code></em> by default. Indicates whether the <strong>bummer</strong> should create a path (in case there are no neede objects on its way) or not.</p>\n</li>\n</ul>\n<p>Takes your value, and sets it up according to the given <em><code>path</code></em>. In case the <em><code>force</code></em> argument is omitted or set to <em><code>true</code></em> <strong>bummer</strong> will create all the needed objects on its way to the end of the <em><code>path</code></em> if some of them don&#39;t exist.<br><strong>Note</strong>. If the <em><code>force</code></em> argument is omitted or <em><code>true</code></em> and one of the <em><code>path</code></em> keys is a number (even if it placed inside of a string, e.g.: <em><code>string.path.to.value.0</code></em>), and it is not the last <em><code>path</code></em> key, <em><strong>bummer</strong></em> will create an array for that key.</p>\n<p><em><strong>Returns</strong></em> a <a href="#bummer_result"><em><code>bummer_result</code></em></a> object, where:</p>\n<ul>\n<li><p><em><strong><code>.value</code></strong></em> equals to <em><code>true</code></em> (<strong>value</strong> was set up successfully) or <em><code>false</code></em> (<strong>bummer</strong> could not set up the <strong>value</strong> for some reason).</p>\n</li>\n<li><p><em><strong><code>.done</code></strong></em> - the same as the <em><code>.value</code></em>.</p>\n</li>\n</ul>\n<h4 id="example-1">Example:</h4>\n<pre><code class="language-js">const data = {\n  user: {\n    name: &#39;Guest&#39;,\n    age: undefined,\n  },\n};\nbummer.set(data, &#39;user.name&#39;, &#39;Anonimous&#39;);\nbummer.set(data, &#39;user.age&#39;, 35);\nbummer.set(data, &#39;user.meta.phone[0]&#39;, &#39;555-3141&#39;);\n\nconsole.log(data.user);\n// {\n//   name: &#39;Anonimous&#39;,\n//   age: 42,\n//   meta: {\n//     phone: [ &#39;555-3141&#39; ],\n//   },\n// }</code></pre>\n<hr>\n<h3 id="bummercheck"><code>bummer.check()</code></h3>\n<p><em><strong><code>bummer.check(</code></strong></em> <a href="#subject"><em><strong><code>subject,</code></strong></em></a> <a href="#path"><em><strong><code>path</code></strong></em></a> <em><strong><code>)</code></strong></em></p>\n<p><em><strong>Returns</strong></em> a <a href="#bummer_result"><em><code>bummer_result</code></em></a> object, where:</p>\n<ul>\n<li><p><em><strong><code>.value</code></strong></em> equals to <em><code>true</code></em> (property exist) or <em><code>false</code></em> (it doesn&#39;t). <strong>Note</strong> that function doesn&#39;t take into account property value. It could be <em><code>undefined</code></em> .</p>\n</li>\n<li><p><em><strong><code>.done</code></strong></em> - the same as the <em><code>.value</code></em>.</p>\n</li>\n</ul>\n<h4 id="example-2">Example:</h4>\n<pre><code class="language-js">const data = {\n  name: &#39;Guest&#39;,\n  phone: undefined,\n};\nif (bummer.check(data, &#39;name&#39;).val()) {\n  console.log(data.name);   // &gt; Guest\n}\nif (bummer.check(data, &#39;phone&#39;).val()) {\n  console.log(data.phone);  // &gt; undefined\n}\nif (bummer.check(data, &#39;address&#39;).val()) {\n  console.log(data.address); // wont work\n}</code></pre>\n<hr>\n<h3 id="bummerremove"><code>bummer.remove()</code></h3>\n<p><em><strong><code>bummer.remove(</code></strong></em> <a href="#subject"><em><strong><code>subject,</code></strong></em></a> <a href="#path"><em><strong><code>path,</code></strong></em></a> <em><strong><code>[, pop = false ]</code></strong></em> <em><strong><code>)</code></strong></em></p>\n<ul>\n<li><em><strong><code>pop&lt;boolean&gt;</code></strong></em> - Optional. <em><code>false</code></em> by default.</li>\n</ul>\n<p><em><strong>Returns</strong></em> a <a href="#bummer_result"><em><code>bummer_result</code></em></a> object, where:</p>\n<ul>\n<li><em><strong><code>.value</code></strong></em> is <em><code>true</code></em> (success) or <em><code>false</code></em> (fail). In case the <em><code>pop</code></em> argument was <em><code>true</code></em>, this field will be equal to the removed property value (or <em><code>undefined</code></em>).</li>\n</ul>\n<h4 id="example-3">Example:</h4>\n<pre><code class="language-js">const data = {\n  name: &#39;Guest&#39;,\n  age: 42,\n};\n\nbummer.remove(data, &#39;name&#39;).val(); // &gt; true\nbummer.remove(data, &#39;phone&#39;).val(); // &gt; false\nbummer.remove(data, &#39;age&#39;, true).val();  // &gt; 42\nbummer.remove(data, &#39;address&#39;, true).val(); // &gt; undefined\nconsole.log(data);  // &gt; {}</code></pre>\n<hr>\n<h3 id="bummerreplace"><code>bummer.replace()</code></h3>\n<p><em><strong><code>bummer.replace(</code></strong></em> <a href="#subject"><em><strong><code>subject,</code></strong></em></a> <a href="#path"><em><strong><code>path,</code></strong></em></a> <em><strong><code>value [, force = true ]</code></strong></em> <em><strong><code>)</code></strong></em></p>\n<p>Almost the same as <em><code>bummer.get</code></em>, but will return a previous property value (if exist) instead of <em><code>true</code></em> or <em><code>false</code></em> within <em><code>bummer_result</code></em> object.</p>\n<ul>\n<li><p><em><strong><code>.value</code></strong></em> equals to <em><code>true</code></em> (<strong>value</strong> was set up successfully) or <em><code>false</code></em> (<strong>bummer</strong> could not set up the <strong>value</strong> for some reason).</p>\n</li>\n<li><p><em><strong><code>force&lt;boolean&gt;</code></strong></em> - Optional. <em><code>true</code></em> by default. Indicates whether the <strong>bummer</strong> should create a path (in case there are no neede objects on its way) or not.</p>\n</li>\n</ul>\n<h4 id="example-4">Example:</h4>\n<pre><code class="language-js">const data = {\n  name: &#39;Guest&#39;,\n  age: 42,\n};\n\nconst oldName = bummer.replace(data, &#39;name&#39;, &#39;Anonimous&#39;);\nconst oldStreet = bummer.replace(data, &#39;address.street&#39;, &#39;Oak&#39;);\nconst oldGender = bummer.replace(data, &#39;details.gender&#39;, &#39;Unicorn&#39;, false);\n\nconsole.log(oldName.val()); // &gt; Guest\nconsole.log(oldStreet.val()); // &gt; undefined\nconsole.log(oldGender.val()); // &gt; undefined\nconsole.log(oldGender.done);  // &gt; false\nconsole.log(data);\n// {\n//   name: &#39;Anonimous&#39;,\n//   age: 42,\n//   address: {\n//     street: &#39;Oak&#39;,\n//   },\n// }</code></pre>\n<hr>\n<h3 id="subject"><code>&lt;subject&gt;</code></h3>\n<p><em><strong><code>subject&lt;object&gt;</code></strong></em> - object (or an array) you want to work with.  </p>\n<hr>\n<h3 id="path"><code>&lt;path&gt;</code></h3>\n<p><em><strong><code>path&lt;key|key[]&gt;</code></strong></em> (<a href="#key"><em><code>&lt;key&gt;</code></em></a>) - path to the object&#39;s (subject) property you target to.</p>\n<hr>\n<h3 id="key"><code>&lt;key&gt;</code></h3>\n<p><em><strong><code>key&lt;string|number|symbol&gt;</code></strong></em> - string, number or symbol, which describes the object property (in case of string it could describe several keys):</p>\n<ul>\n<li><p><em><strong><code>key&lt;string&gt;</code></strong></em> - describes the path to the property (for example <em><code>some.path.to.the.property</code></em>). The string has almost the same sintax as in javascript. The object key&#39;s should be separated by dots or they should be placed inside the square brackets. <strong>You musn&#39;t use</strong> quotes as in javascript. It is means that javascript <em><code>object[&#39;propertyName&#39;]</code></em> is the same as bummer&#39;s <em><code>object[propertyName]</code></em>. If you will send to bummer <em><code>object[&#39;propertyName&#39;]</code></em> string as the path, it will be the same as javascript <em><code>object[&quot;&#39;propertyName&#39;&quot;]</code></em>.</p>\n</li>\n<li><p><em><strong><code>key&lt;number&gt;</code></strong></em> - quite similar to the string type described before, and allows to get access to the array (or object) properties.</p>\n</li>\n<li><p><em><strong><code>key&lt;symbol&gt;</code></strong></em> - simply describes javascript symbol-key (the properties in javascript may be a symbols).</p>\n</li>\n<li><p><em><strong><code>key[]</code></strong></em> - contains ordered keys of any type described before. For example, the <em><code>some.path.to.the.property</code></em> is the same as <em><code>[&#39;some&#39;, &#39;path&#39;, &#39;to&#39;, &#39;the&#39;, &#39;property&#39;]</code></em>, or even <em><code>[&#39;some.path&#39;, &#39;to&#39;, &#39;the[property]&#39;]</code></em>. It is usefull in cases, when one of your properties is <strong>symbol</strong> type (e.g. <em><code>[&#39;users[0].permissions&#39;, sym, &#39;read&#39;]</code></em>).</p>\n</li>\n</ul>\n<h4 id="escape-character">Escape character</h4>\n<p>In the case of a non-standard property name, you can use <strong>escape character</strong> <em><strong><code>/</code></strong></em>. <strong>NOTE</strong>: because of <em><strong><code>/</code></strong></em> symbol has used in javascript as an escape character too, you have to duplicate it when creating a string:</p>\n<pre><code class="language-js">const data = { target: {} };\ndata.target[&#39;some.non-standard[name]&#39;] = 42;\n\nconst answer = bummer(data).get(&#39;target.some//.non-standard//[name//]&#39;);\nconsole.log(answer.val());  // &gt; 42</code></pre>\n<hr>\n<h3 id="bummer_result"><code>&lt;bummer_result&gt;</code></h3>\n<p><em><strong><code>bummer_object&lt;object&gt;</code></strong></em> - details of operation.</p>\n<ul>\n<li><p><em><strong><code>.errors&lt;string[]&gt;</code></strong></em> - human-readable error messages, if there any during the operation.</p>\n</li>\n<li><p><em><strong><code>.done&lt;boolean&gt;</code></strong></em> - is the operation has finished successfully.</p>\n</li>\n<li><p><em><strong><code>.value</code></strong></em> - for different operations returns different values. For example for <em><code>bummer.get()</code></em> it would be the target property value. But for <em><code>bummer.check()</code></em> it would be a <strong>boolean</strong> value (is the target property exist or not).</p>\n</li>\n<li><p><em><strong><code>.val&lt;() =&gt; any&gt;</code></strong></em> - function, which simply returns the value. The same as <em><code>bummer_object.value</code></em>.</p>\n</li>\n<li><p><em><strong><code>.track&lt;track_object[]&gt;</code></strong></em> (<a href="#track_object"><em><code>&lt;track_object&gt;</code></em></a>) - track details. One object for each key from the path (remember, that string-key may contain several path-keys).</p>\n</li>\n</ul>\n<hr>\n<h3 id="track_object"><code>&lt;track_object&gt;</code></h3>\n<p><em><strong><code>track_object&lt;object&gt;</code></strong></em> - details of current step.</p>\n<ul>\n<li><p><em><strong><code>.key&lt;key&gt;</code></strong></em> - the name of property for current step (could be any type of <a href="#key"><em><code>&lt;key&gt;</code></em></a>.</p>\n</li>\n<li><p><em><strong><code>.exist&lt;boolean&gt;</code></strong></em> - is the needed property exist or not.</p>\n</li>\n<li><p><em><strong><code>.created&lt;boolean&gt;</code></strong></em> - is the property was created by the bummer.</p>\n</li>\n<li><p><em><strong><code>.available&lt;boolean&gt;</code></strong></em> - is the property exist, or was created.</p>\n</li>\n<li><p><em><strong><code>.target&lt;object|null&gt;</code></strong></em> - inspected object for current step.</p>\n</li>\n<li><p><em><strong><code>.value&lt;any&gt;</code></strong></em> - current-step value (<em><code>target[key]</code></em>).</p>\n</li>\n</ul>\n<hr>\n'}]).default}));
//# sourceMappingURL=index.js.map