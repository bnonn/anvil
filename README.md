# Anvil

Anvil is a CSS framework developed on principles drawn from the wisdom of computer science more generally. One of the key things that makes it different to the typical approach to CSS is the use of the SOLID principle. This in turn leads to an axiomatic, or algorithmic, approach.

## 1. SOLID

### 1. Single responsibility

One class should only ever do one thing. What this means depends on the layer of abstraction that we're working at. Anvil assumes only three layers, in distinction to other systems like atomic web design, but it also includes a number of other class responsibilities:

* **Layout responsibility:** Here, each class should define one single layout requirement--no more. For instance, creating a box is a separate requirement from stacking boxes, which is separate again from centering them horizontally, which is in turn separate from centering them vertically. To create a stacked, fully-centered layout you would use _composition,_ combining classes--not create a new class that tried to do all three. For this reason, Anvil's core library is a set of layout primitives similar to [Every Layout](https://every-layout.dev), prefixed with `@`.
* **Object responsibility:** Here, each class defines a generic component that cannot be broken down further; i.e., it is a _non-composed, non-layout_ class. This may be an existing element, like a `<button>` or a new one like a `.%card`. The class defines structural features which are integral to the object (spacing of various kinds: margin, padding, line-height), and basic aesthetic patterns (background-color, border etc), but makes no assumptions about what will go inside the object. The class may also define variations of the object. Sizing and color are common instances; e.g., `%placeholder &size:xlarge"`. Variations should only be added when they are needed.
* **Template responsibility:** At the first two layers, CSS is essentially independent of the HTML; the layout and object classes are written with no assumptions (generally) about what the markup structure will look like where they are used. At the template level, HTML and CSS are tightly linked; we are explicitly creating a CSS structure to match and style a defined HTML structure that either _will_ not change, or in fact _must_ always be written the same way. Hence the term _template._ This is not often necessary, and is generally undesirable, as if the markup changes, the CSS breaks. Usually we can simply use composition of layout and objects to achieve what we need on a page, without this danger. But there are some instances where this is inefficient or impossible. Two examples would be the site header (masthead/banner area) and review cards, which must be laid out a particular way, and must be styled precisely to match that layout. Template classes are a natural result of needing repeatable patterns in HTML, and work well with CMSes.
* **Override responsibility:** This includes utility classes, used to make minor adjustments to a general class. Some common adjustments are separated into utilities in Anvil (e.g., `!color:text:warning`), while others are included as variants in lower-level classes (e.g., `@box &space:vert:tight`).
* **API responsibility:** I.e., hooks into JavaScript to achieve things that can't be done using standard CSS (the "default" API). This is fairly rare, as Anvil relies very little on JavaScript, but there are some important enhancements and even core functions that require it. E.g., `?open(dialog)` or `?make(sticky)`.
* **Stateful responsibility:** Also relatively rare, but very important; there are times we need to know the state of an element in order to know what to draw. E.g., `is:active` or `is:stuck`. State classes avoid the `has` keyword to avoid confusion, since we can always use `is` instead; for instance, `has:children` can equally well be `is:parent`.

### 2. Open for extension (but closed to modification)

Established classes should not be modified once they are mature and stable. Rather, if we actually, really, definitely need something similar but different, we should extend an existing class into another. This is why Anvil uses mixins so extensively to define CSS classes; it makes that class extraordinarily trivial to extend (on why we are not using `@extend` instead, see e.g. [Sass Mixins vs Extends: The Data](https://tech.bellycard.com/blog/sass-mixins-vs-extends-the-data/)).

### 3. Liskov substitution

This is a more advanced computer science concept applied in a basic way to CSS. The basic idea is that a child class and parent class should be functionally interchangeable. The takeaway for Anvil is that if a child class is having to override a number of declarations in the parent class, something is wrong. Either the wrong parent is being used, or the child is actually an object in its own right, or the parent itself is breaking the principle of single responsibility by trying to do too much.

### 4. Interface segregation

This is particularly important given the cascading nature of CSS. Changing one class should _never affect_ an unrelated class. Declarations should be limited to their proper domains, so that editing or adding classes later doesn't produce weird and unforeseen results.

A classic example of this is finding extra spaces between elements because margins and padding are being unexpectedly added together from classes that the developer didn't anticipate being adjacent. It should not be necessary for every combination of class adjacency to be anticipated and hard-coded, nor even for hacks like `&:last-child { margin-bottom: 0; }` to be used.

### 5. Dependency inversion

Ideally, we should never depend on anything _concrete;_ only on abstractions. This is obviously impossible to fully do in CSS because fundamentally it does require us to concretely instantiate styles! However, it has important _ramifications_ for how we write those styles. We can actually get a long way toward dependency inversion, and make our lives considerably easier, by implementing layout axioms using primitives (outlined further below), rather than relying on high-level components. This is why all of Anvil's higher-level objects and templates only ever rely on algorithmic abstractions for layout, and to a large extent for aesthetics. The idea is to be able to change any implementation-level object easily, without altering lower-level code, since this could have unexpected consequences.

A functional outworking of this is that Anvil's classes are almost entirely flat in their specificity, except that abstract components have lower specificity. This also means that we prefer negative prescriptions to a small set of sane universal rules over large numbers of more specific positive prescriptions. Exception-based changes to universals (using .e.g. `:not()`), tend to be better than hard-coded positive declarations for every conceivable situation.

## 2. Axiomatic & algorithmic

In order to properly implement the principles of SOLID, Anvil is based on an axiomatic and algorithmic style architecture. This means we're starting with monad-like style algorithms, rather than manually-defined per-component definitions. This is inspired by https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/ and https://every-layout.dev. The idea is simple, but deep: generate a limited number of discrete and very low-specificity classes for creating any layout, before considering any higher-level prescriptions. Then, only when necessary, we build exceptions to these primitives at a higher specificity.

Another way to think of this is as adding some imperative qualities to CSS, rather than relying on pure declaration.

Because the axiomatic system relies on layout primitives and a clear view of the cascade, class namespacing is extremely helpful. We don't need anything as extensive as https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/, but we will take the general idea and use symbols to namespace our major class types:

  - `@` for layout primitives: abstract, implementation-agnostic structures; e.g. `.@stack`. Why? Because they specify where to put something _at_.
  - `%` for objects: concrete, functional implementations; e.g. `.+masthead`. Why? The percentage sign looks a bit like "ob".
  - `+` for templates: implementation-level, markup-dependent compositions designed to style specific HTML that will always be the same. Why? Because the plus sign looks like _t_ for template.
  - `&` for variations to primitives, objects, or templates; e.g., `<div class="@box &color:reversed">` to invert the colors or `&size:xlarge` to increase spacing. Why? Because you're specifying a basic class _and_ some extra variation.
 - `!` for utilities: helper classes that make single-use overrides at the implementation level; e.g. `.!text-align:center`. Why? Because they're `!important`.
 - `is:` for states; e.g. `.is:active`
 - `?` for classes that bind to JavaScript, in order to separate style and functionality; e.g. `.?is:active`. Why? Because the question mark looks like a hook, and because JavaScript is going to interrogate the page for these classes.

All low-level classes are defined using mixins that can then be included in other classes. The idea behind this is extensibility within the code structure of Anvil, _not_ assigning particular layouts to various classes or elements to make front-end development less verbose. In other words, we do _not_ want something like this, just to save us the trouble of explicitly declaring a `<dialog>` element's layout type:
```
dialog {
	@include overlay(); 
	...
}
```
This seems like a good idea at first, but it fundamentally violates the key principles on which Anvil is based. Implicit layouts slightly decrease the effort of coding markup, but they greatly increase _cognitive_ effort because you have to remember whether you need to add a layout class, and they vastly increase coding effort, because at some point you are inevitably going to need a dialog that isn't laid out as an overlay. To avoid these problems, for every element in Anvil, there must be an explicit layout class defined to do the work of setting its size and location--whether that means the element takes this class itself, or is rather a child of another element that does. The only layout that happens implicitly is that which is baked into the rules of CSS given the classes you have assigned. A `<ul>` is not by default a `@stack`; a `div` is not by default a `@box`; a `<dialog>` is not by default an `@overlay`. You need to specify it:
```
<dialog class="@overlay">
	<ul class="@stack fa-ul">
		...
	</ul>
</dialog>
```
Of course, if you don't want your `<ul>` to be a `@stack` because you just want it to follow the standard rules for laying out a list, then don't give it any layout class. The standard CSS rules still apply.

## Naming conventions

Given our implementation of SOLID, the BEM naming convention, while much-loved, is at best a misguided misnomer. There is no block, then element, then modifier. Modifiers should be variants, prefixed with `&`. Blocks should be primitives or objects, and elements should be _other_ primitives or objects. In other words, composition is the name of the game rather than the creation of complex components at the CSS level. Primitives and objects are already namespaced to avoid runtime conflicts, so what we want beneath that level is a standard nomenclature for a minimal set of possible variants or sub-elements.

For example, we will assume that any element that can reasonably take them will have variants like:

 - `.&arrange:right` for fitting elements to the right margin
 - `.&colors:reversed` for a light-on-dark color scheme
 - `.&space:vert:tight` for a vertically-condensed version of an element without the usual `--space-above` and `--space-below`

In the same way, we will use consistent CSS custom values to ensure that key parts of elements can be easily modified:

 - `--space-[above|below|left|right]` for whatever spacing is logical for an element (this should be easily inferred from the element's nature; with a `@box` it will add padding to the box element itself; with a `@battery` it will add space between its children).
 - `--ff` for font-face (which in turn takes `--ff-running`, `--ff-alt` etc).
 - `--size` for overall increment or decrement of sizing.

This doesn't mean there is never any need for a `block__element`-style naming convention; certainly templates get complex enough to count as full components, and will need some kind of sane naming convention. However, we shouldn't ever need double dashes given the use of `&` variants, and to avoid confusion given the discrepancies between BEM assumptions and Anvil's, we will retain only the underscores while leaving the initial class-name implied. This emphasizes that they not standalone classes, but only work as "subsets" of another defined class:

```
<ul class="+feature-list &short-items">
	<i class="__icon">
	...
</ul>

<article class="+review">
	<i class="_avatar fas fa-user-circle"></i>
	<ul>
		<li class="__author">John Doe</li>
		...
	</ul>
</article>
```

## SCSS structure & naming

Every class has its own file.

All filenames are singular; we have `_button.scss` and `_+feature-list.scss`, not `_buttons.scss` and `_+feature-lists.scss`. This is because we're building discrete, single-use objects. They can have variants, but there is only ever _one fundamental object_ per class. When there is an exception to this rule, it is because the SCSS file actually does contain multiple types of something. This is rare, but sometimes it makes more sense to group element types that require very little code; e.g., `_lists.scss` contains definitions for `ul`, `ol` and `dl`.

## Class types

### Templates

If you know the class name, but can't remember if it's a template or an object, a simple way to know is to simply ask: Do I have to remember the specific markup to use here? If you can write whatever markup you want inside the element, without worrying about breaking anything, then it's an object. If not, it's a template.
