# semantic-anvil

Semantic Anvil is a CSS framework developed on principles drawn from the wisdom of computer science more generally. One of the key things that makes it different to the typical approach to CSS is the use of the SOLID principle. This in turn leads to an axiomatic, or algorithmic, approach.

## 1. SOLID

### 1. Single responsibility

One class should only ever do one thing. What this means depends on the layer of abstraction that we're working at. 

* **Layout level:** each class should only effect a single layout requirement. For instance, stacking boxes is a separate requirement from centering them horizontally which is in turn separate from centering them vertically. To create a stacked, fully-centered layout you would use _composition,_ combining classes--not create a new class that tried to do all three.
* **Component level:** each generic component has its own class, defined in its own partial. This does not define every variant of a component for every use case, but only the high-level generic elements of it.
* **Use-case level:** component variants are defined in their own partials with a `component.class` naming scheme; e.g., _buttons.scss will define the basic look and feel of buttons sitewide, while _buttons.cta.scss will theme them for the specific use-case of calls to action.

### 2. Open for extension (but closed to modification)

Established classes should not be modified once they are mature and stable. Rather, if we actually, really, definitely need something similar but different, we should extend an existing class into another.

### 3. Liskov substitution

The basic idea of this is that a child class and parent class should be functionally interchangeable. The takeaway for CSS is that if a child class is having to override a number of declarations in the parent class, something is wrong. Either the wrong parent is being used, or the child is actually a component/axiom/utility in its own right, or the parent itself is breaking the principle of single responsibility by trying to do too much.

### 4. Interface segregation

This is particularly important given the cascading nature of CSS. Changing one class should not affect an unrelated class. Declarations should be limited to their proper domains, so that editing or adding classes later doesn't produce weird and unforeseen results.

A classic example of this is finding extra spaces between elements because margins and padding are being unexpectedly added together from classes that the developer didn't anticipate being adjacent. It should not be necessary for every combination of class adjacency to be hard-coded, or even for hacks like `&:last-child { margin-bottom: 0; } to be used.

### 5. Dependency inversion

We should never depend on anything concrete; only on abstractions. This is obviously impossible to fully implement in CSS once we get to the component level, but we can get a long way there by using axioms (outlined below), rather than high-level components on which lower-level ones rely. Components should only ever rely on algorithmic abstractions. The idea is to be able to change any implementation-level object easily, without altering high-level code, since this could have unexpected consequences.

The functional outworking of this is that Semantic Anvil's classes are almost entirely flat in their specificity, except that the highest-level components have lower specificity. This also means that we prefer negative prescriptions to positive ones: exception-based changes to universal rules (using .e.g. `:not()`), tend to be better than hard-coded positive declarations for every conceivable situation.

## 2. Axioms

In order to properly implement the principles of SOLID, Semantic Anvil is based on an axiomatic and algorithmic style architecture. This means we're starting with monad-like style algorithms, rather than manually-defined per-component definitions. This is inspired by https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/ and https://every-layout.dev. The idea is simple, but deep: generate a limited number of discrete and very low-specificity classes for creating any layout, before considering any component-level prescriptions. Then, only when necessary, we build exceptions to these primitives at a higher specificity. Another way to think of this is as adding some imperative qualities to CSS, rather than relying on pure declaration.

Because the axiomatic system relies on layout primitives and a clear view of the cascade, class namespacing is extremely helpful. We don't need anything as extensive as https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/, but we will take the general idea and use symbols to namespace our major class types:

 - `@` for layout axioms: abstract, implementation-agnostic structural objects; e.g. `.@stack`
 - `+` for components: concrete, functional implementations that rely on the axioms; e.g. `.+masthead`
 - `!` for utilities: helper classes that make single-use overrides at the implementation level; e.g. `.!text-align:center`
 - `[is|has]-` for states; e.g. `.is-active`
 - `js\` for classes that bind to JavaScript, in order to separate style and functionality; e.g. `.js\is-active`

Axioms are defined using mixins that can then be included in components. This means that at the implementation level, it isn't necessary to manually declare every element's structural type. E.g., we do _not_ need to do this:
```
<dialog class="@cover">
	<ul class="@stack fa-ul">
		...
	</ul>
</dialog>
```
Instead, we can simply make sane designations in CSS to begin with:
```
dialog {
	@include \@cover(); 
	...
}

ul {
	@include \@stack();
	...
}
```
Given our implementation of SOLID, the BEM naming convention, while much-loved, is at best a misguided misnomer. There is no block, then element, then modifier. Axioms do not have sub-elements, and components have variants before the component variant, and the component elements. If anything, this is more like BME than BEM. Subsequently, we are ditching BEM to avoid confusion and using a kind of namespace notation instead:
```
<ul class="+feature-list features\full-descriptions">
	...
</ul>
```
