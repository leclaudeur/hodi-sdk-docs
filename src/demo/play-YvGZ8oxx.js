import { _ as e, f as t, g as n, h as r, m as i, n as a, o, v as s } from "./play-Cr0YgyjW.js";
import { i as c, n as l } from "./play-0uCLndnB.js";
import { Toaster as u } from "./play-D5mSPrp8.js";
// node_modules/sonner/dist/styles.css
var d = /* @__PURE__ */ c(l(), 1), f = {
	layer: "_layer_su529_2",
	toast: "_toast_su529_19",
	icon: "_icon_su529_36",
	success: "_success_su529_48",
	error: "_error_su529_53",
	warning: "_warning_su529_58",
	content: "_content_su529_63",
	title: "_title_su529_68",
	action: "_action_su529_73",
	cancel: "_cancel_su529_74"
}, p = /* @__PURE__ */ c(i(), 1), m = () => {
	let i = t();
	return (0, d.useEffect)(o, []), /* @__PURE__ */ (0, p.jsx)("div", {
		ref: a,
		popover: "manual",
		className: f.layer,
		children: /* @__PURE__ */ (0, p.jsx)(u, {
			position: i ? "bottom-right" : "top-center",
			swipeDirections: i ? ["right"] : ["top"],
			offset: i ? {
				right: 24,
				bottom: "calc(24px + var(--offline-toast, 0px))"
			} : void 0,
			mobileOffset: {
				top: "var(--header-top)",
				left: 12,
				right: 12
			},
			gap: 8,
			style: { "--width": "400px" },
			visibleToasts: 3,
			containerAriaLabel: "Messages",
			icons: {
				success: /* @__PURE__ */ (0, p.jsx)(s, { size: 16 }),
				error: /* @__PURE__ */ (0, p.jsx)(e, { size: 16 }),
				info: /* @__PURE__ */ (0, p.jsx)(r, { size: 16 }),
				warning: /* @__PURE__ */ (0, p.jsx)(n, { size: 16 })
			},
			toastOptions: {
				unstyled: !0,
				classNames: {
					toast: f.toast,
					icon: f.icon,
					content: f.content,
					title: f.title,
					actionButton: f.action,
					cancelButton: f.cancel,
					success: f.success,
					error: f.error,
					info: f.info,
					warning: f.warning
				}
			}
		})
	});
};
export { m as default };
